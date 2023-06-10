const express = require('express');
const router = express.Router();
const db = require('../config/config.db');

// Serve the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, name } = req.body;

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
      'INSERT INTO users (username, email) VALUES ($1, $2)',
      [username, email],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // User registration successful, proceed with city insertion
        db.query(
          'INSERT INTO city (name) VALUES ($1)',
          [name],
          (err, result) => {
            if (err) {
              console.error('Error inserting city:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }

            return res.json({ message: 'Registration successful' });
          }
        );
      }
    );
  });
});

module.exports = router;