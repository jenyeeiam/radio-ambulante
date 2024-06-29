from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

def load_transcript_data():
    with open('words.json', 'r') as file:
        return json.load(file)

@app.route('/')
def index():
    transcript_data = load_transcript_data()
    return render_template('index.html', transcript_data=transcript_data)

@app.route('/transcript')
def transcript():
    transcript_data = load_transcript_data()
    return jsonify(transcript_data)

if __name__ == '__main__':
    app.run(debug=True)
