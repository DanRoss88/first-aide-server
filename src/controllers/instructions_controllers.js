// const db = require('../config/config.db');

// const { config } = require("dotenv");

// const getInstructionsByKeyword = (inputString) => {
//   const prompt = `%${inputString}%`;

//   return db
//     .query('SELECT instruction FROM instructions WHERE $1 ILIKE CONCAT(\'%\', keyword, \'%\')', [prompt])
//     .then((data) => data.rows)
//     .catch((err) => {
//       console.log('Error retrieving instructions:', err);
//       throw err; 
//     });
// };

// module.exports = { getInstructionsByKeyword };


// dot env config

// require('dotenv').config();


// const openai = process.env.OPENAI_API_KEY;


// const getInstructionsByUserInput = async (input) => {
//   const prompt = `You are a helpful first aid instructor. You are teaching a class of students how to ${input}. The students are listening attentively. You begin to explain the steps of ${input}.`;
//   const keywordPrompt = "Please give me the title of these instructions to store as a bookmark:";

//   const instructions = await openai.createCompletion({
//     engine: 'text-davinci-003',
//     prompt: prompt,
//     maxTokens: 100,
//     temperature: 0.5,
//     n: 1,
//     stop: '\n'
//   });
//   console.log(instructions.choices[0].text);

//   const keyword = await openai.createCompletion({
//     engine: 'text-davinci-003',
//     prompt: keywordPrompt,
//     maxTokens: 100,
//     temperature: 0.5,
//     n: 1,
//     stop: '\n'
//   });
//   console.log(keyword.choices[0].text);

//   return { instructions: instructions.choices[0].text, keyword: keyword.choices[0].text };
// };

// module.exports = { getInstructionsByUserInput };
