const db = require('../config/config.db');

const getInstructionsByKeyword = (req, res) => {
`SELECT  FROM instructions WHERE keyword = $1`
}