const db = require("../config/config.db");

////// Emergency Contact Controller Functions

// Get all emergency contacts by user ID

const getAllEmergencyContacts = (userId) => {
  return db
    .query("SELECT * FROM emergency_contact WHERE users_id = $1", [userId])
    .then((data) => data.rows)
    .catch((err) => {
      console.log("Error retrieving emergency contacts:", err);
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
      console.log("Error creating emergency contact:", err);
      throw err;
    });
};

///// Delete an emergency contact

const deleteEmergencyContact = (phone, userId) => {
  return db
    .query(
      "DELETE FROM emergency_contact WHERE phone = $1 AND users_id = $2 RETURNING *",
      [phone, userId]
    )
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log("Error deleting emergency contact:", err);
      throw err;
    });
};

module.exports = {
  getAllEmergencyContacts,
  createEmergencyContact,
  deleteEmergencyContact,
};
