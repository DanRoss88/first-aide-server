const express = require('express');
const homeRouter = express.Router();


router.get('/', (req, res) => {
  res.send('Hello World!')
}
)

module.exports = homeRouter;