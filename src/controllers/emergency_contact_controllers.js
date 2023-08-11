const db = require("../config/config.db");

////// Emergency Contact Controller Functions

// Get all emergency contacts by user ID

const getAllEmergencyContacts = (userId) => {
  return db
    .query("SELECT * FROM emergency_contact WHERE users_id = $1", [userId])
    .then((data) => data.rows)
    .catch((err) => {
      throw err;
    });
};

///// Create an emergency contact

const createEmergencyContact = (
  userId,
  contactName,
  phoneNumber,
  relationship
) => {
  return db
    .query(
      "INSERT INTO emergency_contact (users_id, name, phone, relationship) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, contactName, phoneNumber, relationship]
    )
    .then((data) => data.rows[0])
    .catch((err) => {
      throw err;
    });
};

///// Delete an emergency contact

const deleteEmergencyContact = (contactId, userId) => {
  return db
    .query(
      "DELETE FROM emergency_contact WHERE id = $1 AND users_id = $2 RETURNING *",
      [contactId, userId]
    )
    .then((data) => data.rows[0])
    .catch((err) => {
      throw err;
    });
};

const getEmergencyContactById = (contactId, userId) => {
  return db
    .query("SELECT * FROM emergency_contact WHERE id = $1 AND users_id = $2", [
      contactId,
      userId,
    ])
    .then((data) => data.rows[0])
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getAllEmergencyContacts,
  createEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContactById,
};
