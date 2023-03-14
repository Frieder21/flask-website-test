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

if __name__ == '__main__':
    app.run()

