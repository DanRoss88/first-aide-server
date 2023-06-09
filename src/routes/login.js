const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/config.db');

// Login route
router.post('/login', (req, res) => {
  const { email } = req.body;

  // Find the user by email
  db.query('SELECT * FROM "user" WHERE email = $1', [email])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email' });
      }

      // Generate a JWT token with the user_id as the payload
      const user_id = result.rows[0].id;
      const token = jwt.sign({ user_id }, 'your_secret_key');

      return res.json({ token });
    })
    .catch((err) => {
      console.error('Error logging in:', err);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;

