import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Summarizer from './pages/Summarizer';
import Profile from './pages/Profile'; // Add this

import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
      <div className="brand">
  <img src="/logo192.png" alt="NoteGenius Logo" style={{ height: '25px', marginRight: '10px', verticalAlign: 'middle' }} />
  NoteGenius
</div>
  <Link to="/register">Register</Link>
  <Link to="/login">Login</Link>
  <Link to="/summarizer">Summarizer</Link>
  <Link to="/profile">Profile</Link>
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/login";
    }}
  >
    Logout
  </button>
</nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
