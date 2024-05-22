from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/test/<name>')
def test(name):
    return f'This is a test for {name}'


if __name__ == "__main__":
    app.run()
  