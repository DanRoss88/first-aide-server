// const { getInstructionsByKeyword } = require('../controllers/instructions_controllers');

// const db = require('../config/config.db');
// const openai = require('openai');
// require ('dotenv').config();

// const openaiApiKey = process.env.OPENAI_API_KEY;
// const openaiClient = new openai.OpenAIApi(openaiApiKey);
// const express = require('express');
// const instructionsRouter = express.Router();
// const { getInstructionsByUserInput } = require('../controllers/instructions_controllers');

// instructionsRouter.post('/', async (req, res) => {
//   try {
//     const userInput = req.body.input;
//     const instructions = await getInstructionsByUserInput(userInput);
//     res.json({ instructions });
//   } catch (error) {
//     console.error('An error occurred:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// module.exports = instructionsRouter;
// instructionsRouter.get("/", async (req, res) => {
//   try {
//     const instructions = await db.query("SELECT * FROM instructions");
//     res.json(instructions.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve instructions." });
//   }
// });

// instructionsRouter.get('/:keyword', (req, res) => {
//   const inputString = req.params.keyword;

//   getInstructionsByKeyword(inputString)
//     .then((data) => {
//       if (data.length > 0) {
//         const instruction = data[0].instruction;
//         console.log('Instruction:', instruction);
//         res.json({ instruction }); // Send the instruction as JSON response to the front end
//       } else {
//         console.log('No instruction found for the given keyword.');
//         res.json({ instruction: 'No instruction found' }); // Send null as the instruction if not found
//       }
//     })
//     .catch((error) => {
//       console.error('An error occurred:', error);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

///// OPEN AI CODE /////

const express = require("express");
const instructionsRouter = express.Router();
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

instructionsRouter.post("/", async (req, res) => {
  try {
    const { input } = req.body;

    const prompt = `You are a helpful first aid instructor.\nQ: ${input}\nA:`;
    const instructions = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    const generatedInstructions = instructions.data.choices[0].text.trim();

    const titlePrompt = `Can you give me a title (minimum 1 word, maximum 2 words) for these instructions, please:\n"${generatedInstructions}"\nTitle:`;
    const title = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: titlePrompt,
      max_tokens: 10,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    const generatedTitle = title.data.choices[0].text.trim();

    console.log({
      title: generatedTitle,
      instructions: generatedInstructions,
    });

    return res.status(200).json({
      title: generatedTitle,
      instructions: generatedInstructions,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

module.exports = instructionsRouter;
