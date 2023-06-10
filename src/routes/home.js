const express = require('express');
const router = express.Router();
const db = require('../config/config.db');

router.get('/', (req, res) => {
  res.send('Hello World!')
}
)

module.exports = router;