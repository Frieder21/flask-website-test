from flask import Flask, render_template, redirect, send_file, request, url_for
import os

app = Flask(__name__)


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

if __name__ == '__main__':
    app.run()

