from flask import Flask

app = Flask(__name__)

a=1

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"