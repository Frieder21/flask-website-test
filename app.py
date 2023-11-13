import hashlib
import secrets
import json
import time
from flask import Flask, render_template, redirect, send_file, request, url_for, make_response
import os

app = Flask(__name__)

def read_keys()->list:
    try:
        with open("hashed-key.json", "r") as f:
            login_keys = json.load(f)
    except:
        login_keys = []
    return login_keys

def delete_exspired_keys():
    login_keys = read_keys()
    for key in login_keys:
        if key["time"] < time.time():
            login_keys.remove(key)
    with open("hashed-key.json", "w") as f:
        json.dump(login_keys, f)

def check_if_key(login_key:str) -> bool:
    delete_exspired_keys()
    login_keys = read_keys()
    login_key = hashlib.sha256(bytes(login_key, "utf-8")).hexdigest()
    for key in login_keys:
        if key["key"] == login_key:
            return True
    return False

def create_key() -> str:
    login_key = secrets.token_hex(256)
    login_keys = read_keys()
    login_keys.append({"key": hashlib.sha256(bytes(login_key, "utf-8")).hexdigest(), "time": time.time()+60*60*24})
    with open("hashed-key.json", "w") as f:
        json.dump(login_keys, f)
    return login_key

def delete_key(login_key:str):
    login_keys = read_keys()
    login_keys = [key for key in login_keys if key["key"] != hashlib.sha256(bytes(login_key, "utf-8")).hexdigest()]
    with open("hashed-key.json", "w") as f:
        json.dump(login_keys, f)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return redirect("article?article=about me")

@app.route("/article")
def article():
    return render_template("article.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/googlee5e00380f3d25861.html")
def google():
    return render_template("googlee5e00380f3d25861.html")

@app.route("/download", methods=['GET', 'POST'])
def download():
    if request.method == 'POST':
        file = request.form['file']
    elif request.method == 'GET':
        file = request.args.get('file')
    try:
        file = str(file)
    except:
        return redirect(url_for('error', error="Invalid download"))
    if os.path.isfile(os.path.normpath(os.path.join(os.path.dirname(__file__), "static", "downloads", file))):
        return send_file(os.path.normpath(os.path.join(os.path.dirname(__file__), "static", "downloads", file)), as_attachment=True)

    return redirect(url_for('error', error="Invalid download"))

@app.route("/error", methods=['GET', 'POST'])
def error():
    if request.method == 'POST':
        error = request.form['error']
    elif request.method == 'GET':
        error = request.args.get('error')
    try:
        error = str(error)
    except:
        return redirect(url_for('error', error="No error specified", error_message="No error message specified"))
    error_message = {
        "Invalid download": "The download you requested is invalid. Please try again.",
    }
    if error in error_message:
        return render_template("error.html", error=error, str=str, error_message=error_message[error])
    return render_template("error.html", error=error, str=str, error_message="No error message specified")

@app.route("/login")
def login():
    try:
        login_key_cookie = request.cookies.get('login_key')
        if login_key_cookie == None:
            return render_template("login.html")
    except:
        return render_template("login.html")
    if check_if_key(login_key_cookie):
        return redirect(url_for('pc'))
    return render_template("login.html")

@app.route('/logout')
def logout():
    try:
        login_key_cookie = request.cookies.get('login_key')
        if login_key_cookie == None:
            return render_template("login.html")
    except:
        return render_template("login.html")
    if check_if_key(login_key_cookie):
        delete_key(login_key_cookie)
        resp = make_response(redirect(url_for('login')))
        resp.set_cookie("login_key", "", max_age=0, secure=True, httponly=True)
        return resp

@app.route('/handle_data', methods=['POST'])
def handle_data():
    username = request.form['username']
    password = request.form['password']
    if username == "frieda" and hashlib.sha256(bytes(password, "utf-8")).hexdigest() == "e9ac26f4690425121bff5ef0e8f951dd14059656a2bd768aa04e5af865a3053f":
        login_key = create_key()
        resp = make_response(redirect(url_for('pc')))
        resp.set_cookie("login_key", login_key, max_age=60*60*24, secure=True, httponly=True)
        return resp
    else:
        return redirect(url_for('login'))
@app.route("/pc")
def pc():
    try:
        login_key_cookie = request.cookies.get('login_key')
        if login_key_cookie == None:
            return redirect(url_for('login'))
    except:
        return redirect(url_for('login'))
    if check_if_key(login_key_cookie):
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(2)
        response = sock.connect_ex(('10.79.21.34', 3389))
        if response == 0:
            title = "power is on"
            button = "poweroff"
            action = "turnoff"
        else:
            title = "power is off"
            button = "poweron"
            action = "turnon"
        return render_template("pc.html" , title=title, button=button, action=action)
    return redirect(url_for('login'))

@app.route("/turnon", methods=['GET', 'POST'])
def turnon():
    try:
        login_key_cookie = request.cookies.get('login_key')
        if login_key_cookie == None:
            return redirect(url_for('login'))
    except:
        return redirect(url_for('login'))
    if check_if_key(login_key_cookie):
        os.system("/usr/bin/python3 /home/frieda/on.py")
        return redirect(url_for('redirectinsecounds', time=30, redirect_to="pc"))
    return redirect(url_for('login'))

@app.route("/turnoff", methods=['GET', 'POST'])
def turnoff():
    try:
        login_key_cookie = request.cookies.get('login_key')
        if login_key_cookie == None:
            return redirect(url_for('login'))
    except:
        return redirect(url_for('login'))
    if check_if_key(login_key_cookie):
        os.system("/usr/bin/python3 /home/frieda/off.py")
        return redirect(url_for('redirectinsecounds', time=30, redirect_to="pc"))
    return redirect(url_for('login'))

@app.route("/redirectinsecounds", methods=['GET', 'POST'])
def redirectinsecounds():
    if request.method == 'POST':
        t = request.form['time']
        redirect_to = request.form['redirect_to']
    elif request.method == 'GET':
        t = request.args.get('time')
        redirect_to = request.args.get('redirect_to')
    try:
        t = int(t)
        redirect_url = url_for(redirect_to)
    except:
        return redirect(url_for('error', error="Invalid redirect"))
    return render_template("redirectinsecounds.html", t=t, url=redirect_url)

if __name__ == '__main__':
    app.run()

