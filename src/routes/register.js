const express = require('express');
const router = express.Router();
const db = require('../config/config.db');

// Register route
router.post('/register', (req, res) => {
  const { username, email, city } = req.body;

  // Check if the email already exists
  db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If email already exists, return an error
    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Email doesn't exist, proceed with user registration
    db.query(
      'INSERT INTO users (username, email, city) VALUES ($1, $2, $3)',
      [username, email, city],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        
        return res.json({ message: 'Registration successful' });
      }
    );
  });
});

module.exports = router;