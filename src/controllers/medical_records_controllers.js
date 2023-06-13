const db = require("../config/config.db");

// Medical Info Controller Functions

const getUserAllergy = async (userId) => {
  const allergyData = await db.query(
    `SELECT allergy.name, allergy.severity
    FROM medical_records
    JOIN allergy ON medical_records.id = allergy.medical_records_id
    WHERE users_id = $1`,
    [userId]
  );

  return allergyData.rows;
};

const getUserCondition = async (userId) => {
  const conditionData = await db.query(
    `SELECT condition.name 
    FROM medical_records
    JOIN "condition" ON medical_records.id = "condition".medical_records_id
    WHERE users_id = $1`,
    [userId]
  );
  return conditionData.rows;
};

const getUserMedication = async (userId) => {
  const medicationData = await db.query(
    `SELECT medication.name
    FROM medical_records
    JOIN medication ON medical_records.id = medication.medical_records_id
    WHERE users_id = $1`,
    [userId]
  );
  return medicationData.rows;
};

module.exports = {
  getUserAllergy,
  getUserCondition,
  getUserMedication,
};

// return db
//   .query("SELECT * FROM medical_records WHERE users_id = $1", [userId])
//   .then((data) => data.rows[0])
//   .catch((err) => {
//     console.log("Error retrieving medical information:", err);
//     throw err;
//   });
// Update user's medical information

// const updateUserMedicalInfo = (userID, medicalRecordId) => {

//   return db
//     .query('UPDATE medical_records SET users_id = $1 WHERE id = $2 RETURNING *', [userID, medicalRecordId])
//     .then((data) => data.rows[0])
//     .catch((err) => {
//       console.log('Error updating medical information:', err);
//       throw err;
//     });
//   };
