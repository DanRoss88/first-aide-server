const { getInstructionsByKeyword } = require('../controllers/instructions_controllers');
const express = require('express');
const instructionsRouter = express.Router();
const db = require('../config/config.db');


instructionsRouter.get("/", async (req, res) => {
  try {
    const instructions = await db.query("SELECT * FROM instructions");
    res.json(instructions.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve instructions." });
  }
});


instructionsRouter.get('/:keyword', (req, res) => {
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

module.exports = instructionsRouter;

