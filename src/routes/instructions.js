const { getInstructionsByKeyword } = require('../controllers/instructionController');
const express = require('express');
const router = express.Router();



app.get('/instructions/:keyword', (req, res) => {
  const keyword = req.params.keyword;

  getInstructionsByKeyword(keyword)
    .then((data) => {
      res.json(data); // Send the data as JSON response to the front end
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});