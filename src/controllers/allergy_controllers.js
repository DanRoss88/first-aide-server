const db = require('../config/config.db');

// // Get allergies by medical records ID
const getAllergiesByMedicalRecords = (medicalRecordsId) => {

  return db
    .query('SELECT * FROM allergy WHERE medical_records_id = $1', [medicalRecordsId])
    .then((data) => data.rows)
    .catch((err) => {
      console.log('Error retrieving allergies:', err);
      throw err;
    });
  };

// // Create a new allergy
const createAllergy = (medicalRecordsId, allergyName, allergySeverity) => {


  return db
    .query('INSERT INTO allergy (medical_records_id, name, severity) VALUES ($1, $2, $3) RETURNING *', [medicalRecordsId, allergyName, allergySeverity])
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error creating allergy:', err);
      throw err;
    });
  };


// // Delete user allergy by ID

const deleteAllergy = (allergyId, medicalRecordsId) => {

  return db
    .query('DELETE FROM allergy WHERE id = $1 AND medical_records_id = $2 RETURNING *', [allergyId, medicalRecordsId])  
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error deleting allergy:', err);
      throw err;
  });
};

// // Edit user allergy by ID

const editAllergy = (allergyId, allergyName, allergySeverity, medicalRecordsId) => {

  return db
    .query('UPDATE allergy SET name = $1, severity = $2 WHERE id = $3 AND medical_records_id = $4 RETURNING *', [allergyName, allergySeverity, allergyId, medicalRecordsId])  
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error editing allergy:', err);
      throw err;
  });
};

module.exports = {
  getAllergiesByMedicalRecords,
  createAllergy,
  deleteAllergy,
  editAllergy
};
