
# 🧠 NoteGenius – AI-Powered Note Summarizer

NoteGenius is a full-stack AI web application that allows users to securely log in, input long paragraphs or notes, and instantly receive a concise AI-generated summary using Hugging Face's distilbart model. It also stores each user's summary history in a secure and private way.

---

## 🔧 Tech Stack

- **Frontend:** React.js, HTML, CSS
- **Backend API:** Node.js, Express.js, JWT, MySQL
- **AI Server:** Python Flask, Hugging Face Transformers (`distilbart-cnn-12-6`)
- **Database:** MySQL
- **Tools:** Axios, bcrypt, Flask-CORS, Git, Postman

---

## 📁 Project Structure

```
note-genius/
├── client/     # React frontend (UI)
├── server/     # Node.js backend (auth & database)
├── ai/         # Flask backend for AI summarization
```

---

## 🚀 Features

- 🔐 Secure user registration and login
- 🧠 Instant AI-powered summarization using Hugging Face
- 💾 Summary history saved per user
- 🧽 Option to clear all summary history
- 🧭 Simple and intuitive UI

---

## 💻 How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/nadira-anjum/note-genius.git
cd note-genius
```

2. **Frontend:**
```bash
cd client
npm install
npm start
```

3. **Backend API:**
```bash
cd ../server
npm install
node index.js
```

4. **AI Flask Server:**
```bash
cd ../ai
pip install -r requirements.txt
python app.py
```

Make sure MySQL is running and your `.env` variables are correctly set up for database connection and JWT secret.

---

## 👩‍💻 Developer

**Nadira Anjum**  
Ravensbourne University London  
Course: Full Stack Application Development  
April 2025

---

## 🌐 License

This project is for educational purposes only and is part of a university submission.
