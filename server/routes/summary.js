const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

// Save summary
router.post('/', verifyToken, (req, res) => {
  const { original_text, summary } = req.body;
  const userId = req.userId;
  router.delete('/', verifyToken, (req, res) => {
    const userId = req.userId;
    db.query('DELETE FROM summaries WHERE user_id = ?', [userId], (err) => {
      if (err) return res.status(500).json({ msg: 'Error clearing history' });
      res.json({ msg: 'History cleared' });
    });
  });
  

  db.query(
    'INSERT INTO summaries (user_id, original_text, summary) VALUES (?, ?, ?)',
    [userId, original_text, summary],
    (err) => {
      if (err) return res.status(500).json({ msg: 'DB Error', error: err });
      res.json({ msg: 'Summary saved!' });
    }
  );
});

// Get summaries
router.get('/', verifyToken, (req, res) => {
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

module.exports = router;
