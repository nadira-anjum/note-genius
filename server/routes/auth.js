const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const db = require('../config/db');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, (req, res) => {
    res.json({ msg: "You are authenticated!", userId: req.userId });
  });

module.exports = router;

// Save summary
router.post('/summary', verifyToken, (req, res) => {
    const { original_text, summary } = req.body;
    const userId = req.userId;
  
    console.log("Saving summary:");
    console.log("User ID:", userId);
    console.log("Original:", original_text);
    console.log("Summary:", summary);
  
    db.query(
      'INSERT INTO summaries (user_id, original_text, summary) VALUES (?, ?, ?)',
      [userId, original_text, summary],
      (err) => {
        if (err) {
          console.error("❌ DB Error:", err);
          return res.status(500).json({ msg: 'DB Error', error: err });
        }
        res.json({ msg: 'Summary saved!' });
      }
    );
  });
  
  
  // Get summaries for user
  router.get('/summary', verifyToken, (req, res) => {
    const userId = req.userId;
  
    db.query(
      'SELECT * FROM summaries WHERE user_id = ? ORDER BY created_at DESC',
      [userId],
      (err, results) => {
        if (err) return res.status(500).json({ msg: 'DB Error' });
        res.json(results);
      }
    );
  });
