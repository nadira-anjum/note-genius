import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;

      console.log('LOGIN SUCCESS');
      console.log('TOKEN:', token);
      console.log('USER:', user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setMessage(`Welcome, ${user.username}`);
      window.location.href = '/summarizer'; // redirect
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error');
    }
  };

  return (
<div className="container">
<h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
