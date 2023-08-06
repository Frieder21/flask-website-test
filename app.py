from flask import Flask, render_template, redirect

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

if __name__ == '__main__':
    app.run()

