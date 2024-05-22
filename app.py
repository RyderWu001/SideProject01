from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Ruby is beatiful"

@app.route('/test/<name>')
def test(name):
    return f'This is a test for {name}'

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    return f'Hello, {name}!'

if __name__ == "__main__":
    app.run(debug=True)
