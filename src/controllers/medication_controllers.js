const db = require('../config/config.db');

// Medication Controller Functions


// Get all medications by medical records ID

const getMedicationsByMedicalRecords = (medicalRecordsId) => {

  return db
    .query('SELECT * FROM medication WHERE medical_records_id = $1', [medicalRecordsId])
    .then((data) => data.rows)
    .catch((err) => {
      console.log('Error retrieving medications:', err);
      throw err;
    });
  };

// Create a new user medication by medical records ID

const createMedication = (medicalRecordsId, medicationName) => {

  return db 
    .query('INSERT INTO medication (medical_records_id, name) VALUES ($1, $2) RETURNING *', [medicalRecordsId, medicationName]) 
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error creating medication:', err);
      throw err;
    });
  };

  // Delete user medication by ID

  const deleteMedication = (medicationId, medicalRecordsId) => {

    return db
      .query('DELETE FROM medication WHERE id = $1 AND medical_records_id = $2 RETURNING *', [medicationId, medicalRecordsId])
      .then((data) => data.rows[0])
      .catch((err) => {
        console.log('Error deleting medication:', err);
        throw err;
    });
  };

  // Edit user medication by ID

  // const editMedication = (medicationId, medicationName, medicalRecordsId) => {

  //   return db
  //     .query('UPDATE medication SET name = $1 WHERE id = $2 AND medical_records_id = $3 RETURNING *', [medicationName, medicationId, medicalRecordsId])
  //     .then((data) => data.rows[0])
  //     .catch((err) => {
  //       console.log('Error editing medication:', err);
  //       throw err;
  //   });
  // };



module.exports = {
  getMedicationsByMedicalRecords,
  createMedication,
  deleteMedication
};
