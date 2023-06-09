const db = require('../config/config.db');

const getInstructionsByKeyword = (inputString) => {
  const prompt = `%${inputString}%`;

  return db
    .query('SELECT instruction FROM instructions WHERE $1 ILIKE CONCAT(\'%\', keyword, \'%\')', [prompt])
    .then((data) => data.rows)
    .catch((err) => {
      console.log('Error retrieving instructions:', err);
      throw err; 
    });
};

module.exports = { getInstructionsByKeyword };
