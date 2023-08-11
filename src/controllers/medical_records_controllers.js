const db = require("../config/config.db");

// Medical Info Controller Functions

const getUserAllergy = async (userId) => {
  const allergyData = await db.query(
    `SELECT allergy.id, allergy.name, allergy.severity
    FROM medical_records
    JOIN allergy ON medical_records.id = allergy.medical_records_id
    WHERE users_id = $1`,
    [userId]
  );

  return allergyData.rows;
};

const getUserCondition = async (userId) => {
  const conditionData = await db.query(
    `SELECT condition.id, condition.name 
    FROM medical_records
    JOIN "condition" ON medical_records.id = "condition".medical_records_id
    WHERE users_id = $1`,
    [userId]
  );
  return conditionData.rows;
};

const getUserMedication = async (userId) => {
  const medicationData = await db.query(
    `SELECT medication.id, medication.name
    FROM medical_records
    JOIN medication ON medical_records.id = medication.medical_records_id
    WHERE users_id = $1`,
    [userId]
  );
  return medicationData.rows;
};

const createUserAllergy = async (userId, name, severity) => {
  const medicalRecordId = await db.query(
    `SELECT medical_records.id
    FROM medical_records
    WHERE users_id = $1`,
    [userId]
  );

  const updateAllergy = await db.query(
    `INSERT INTO allergy (medical_records_id, name, severity)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [medicalRecordId.rows[0].id, name, severity]
  );
  return updateAllergy.rows[0];
};

const deleteUserAllergy = async (allergyId, userId) => {
  const deleteAllergy = await db.query(
    `DELETE FROM allergy
    WHERE allergy.id = $1
    AND allergy.medical_records_id IN (
      SELECT medical_records.id
      FROM medical_records
      JOIN users ON users.id = medical_records.users_id
      WHERE users.id = $2
    );`,
    [allergyId, userId]
  );
  return deleteAllergy.rowCount;
};

const createUserMedication = async (userId, name) => {
  const medicalRecordId = await db.query(
    `SELECT medical_records.id
    FROM medical_records
    WHERE users_id = $1`,
    [userId]
  );

  const updateMedication = await db.query(
    `INSERT INTO medication (medical_records_id, name)
    VALUES ($1, $2)
    RETURNING *`,
    [medicalRecordId.rows[0].id, name]
  );
  return updateMedication.rows[0];
};

const deleteUserMedication = async (userId, medicationId) => {
  const deleteMedication = await db.query(
    `DELETE FROM medication
    WHERE medication.id = $1
    AND medication.medical_records_id IN (
      SELECT medical_records.id
      FROM medical_records
      JOIN users ON users.id = medical_records.users_id
      WHERE users.id = $2
    );`,
    [medicationId, userId]
  );
  return deleteMedication.rowCount;
};

const createUserCondition = async (userId, name) => {
  const medicalRecordId = await db.query(
    `SELECT medical_records.id
    FROM medical_records
    WHERE users_id = $1`,
    [userId]
  );

  const updateCondition = await db.query(
    `INSERT INTO "condition" (medical_records_id, name)
    VALUES ($1, $2)
    RETURNING *`,
    [medicalRecordId.rows[0].id, name]
  );
  return updateCondition.rows[0];
};

const deleteUserCondition = async (userId, conditionId) => {
  const deleteCondition = await db.query(
    `DELETE FROM "condition"
    WHERE "condition".id = $1
    AND "condition".medical_records_id IN (
      SELECT medical_records.id
      FROM medical_records
      JOIN users ON users.id = medical_records.users_id
      WHERE users.id = $2
    );`,
    [conditionId, userId]
  );
  return deleteCondition.rowCount;
};

module.exports = {
  getUserAllergy,
  getUserCondition,
  getUserMedication,
  createUserAllergy,
  deleteUserAllergy,
  createUserMedication,
  deleteUserMedication,
  createUserCondition,
  deleteUserCondition,
};