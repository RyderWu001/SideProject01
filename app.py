from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/test')
def test(name):
    return 'This is a test for'
@app.route('/page/text')
def pageText():
    return render_template('page.html', text="Python Flask !")

@app.route('/page/av')
def pageAV():
    return render_template('av.html')

if __name__ == "__main__":
    app.run(debug=True)
