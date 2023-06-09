const express = require('express');
const router = require('express').Router();
const db = require('../config/config.db');


// Login route
router.post('/login', async (req, res) => {
  const { email } = req.body;

  // Find the user by email
  try {
    const result = await db.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    return res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error logging in:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});