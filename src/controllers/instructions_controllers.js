const db = require('../config/config.db');

const getInstructionsByKeyword = (inputString) => {
 const prompt = `%${inputString}%`;

return db
  .query(`SELECT * FROM instructions WHERE ILIKE keyword = $1`, [prompt])
  .then(data => data.rows);
}







module.exports = { getInstructionsByKeyword, }