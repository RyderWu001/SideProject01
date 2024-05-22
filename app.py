from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Ruby is so beautiful!"

@app.route('/test')
def test(name):
    return 'This is a test for'

if __name__ == "__main__":
    app.run(debug=True)
