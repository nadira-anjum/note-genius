const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username)
    return res.status(400).json({ msg: "Please enter all fields" });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      res.json({ msg: "User registered!" });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: err.message });

    if (results.length === 0)
      return res.status(400).json({ msg: "User not found" });

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
};
