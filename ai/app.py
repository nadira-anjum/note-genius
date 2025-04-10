from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # 👈 This enables CORS for all routes

summarizer = pipeline("summarization")

@app.route("/summarize", methods=["POST"])
def summarize_text():
    data = request.get_json()
    text = data.get("text", "")
    summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
    return jsonify({"summary": summary[0]['summary_text']})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
