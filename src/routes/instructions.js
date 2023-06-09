const { getInstructionsByKeyword } = require('../controllers/instructions_controllers');
const express = require('express');
const router = express.Router();

router.get('/instructions/:keyword', (req, res) => {
  const inputString = req.params.keyword;

  getInstructionsByKeyword(inputString)
    .then((data) => {
      if (data.length > 0) {
        const instruction = data[0].instruction;
        console.log('Instruction:', instruction);
        res.json({ instruction }); // Send the instruction as JSON response to the front end
      } else {
        console.log('No instruction found for the given keyword.');
        res.json({ instruction: 'No instruction found' }); // Send null as the instruction if not found
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;

