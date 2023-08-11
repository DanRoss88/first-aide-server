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

    const prompt = `You are a helpful first aid instructor. ${input}?`;
    const instructions = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
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
    });

    const generatedTitle = title.data.choices[0].text.trim();

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
