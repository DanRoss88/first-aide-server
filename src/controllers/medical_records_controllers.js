const db = require('../config/config.db');

// // Medical Info Controller Functions

// Get user's medical information
const getUserMedicalInfo = (userId) => {

  return db
    .query('SELECT * FROM medical_records WHERE users_id = $1', [userId])
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error retrieving medical information:', err);
      throw err;
    });
  };

// Update user's medical information

const updateUserMedicalInfo = (userID, medicalRecordId) => {

  return db
    .query('UPDATE medical_records SET users_id = $1 WHERE id = $2 RETURNING *', [userID, medicalRecordId])
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error updating medical information:', err);
      throw err;
    });
  };  

module.exports = {
  getUserMedicalInfo,
  updateUserMedicalInfo,
};