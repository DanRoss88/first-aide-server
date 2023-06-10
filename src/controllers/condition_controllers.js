const db = require('../config/config.db');


//// Condition Controller Functions ////

/// Get all conditions by medical records ID

const getConditionsByMedicalRecords = (medicalRecordsId) => {

  return db
    .query('SELECT * FROM condition WHERE medical_records_id = $1', [medicalRecordsId])
    .then((data) => data.rows)
    .catch((err) => { 
      console.log('Error retrieving conditions:', err);
      throw err;
    });
  };

/// Create a new user condition by medical records ID

const createCondition = (medicalRecordsId, conditionName) => {

  return db
    .query('INSERT INTO condition (medical_records_id, name) VALUES ($1, $2) RETURNING *', [medicalRecordsId, conditionName]) 
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error creating condition:', err);
      throw err;
    });
  };

  //// Delete user condition by ID

  const deleteCondition = (conditionId, medicalRecordsId) => {

    return db
      .query('DELETE FROM condition WHERE id = $1 AND medical_records_id = $2 RETURNING *', [conditionId, medicalRecordsId])
      .then((data) => data.rows[0])
      .catch((err) => {
        console.log('Error deleting condition:', err);
        throw err;
    });
  };

  //// Edit user condition by ID

  const editCondition = (conditionId, conditionName, medicalRecordsId) => {

    return db
      .query('UPDATE condition SET name = $1 WHERE id = $2 AND medical_records_id = $3 RETURNING *', [conditionName, conditionId, medicalRecordsId])
      .then((data) => data.rows[0])
      .catch((err) => {
        console.log('Error editing condition:', err);
        throw err;
    });
  };



module.exports = {
  getConditionsByMedicalRecords,
  createCondition,
  deleteCondition,
  editCondition
};