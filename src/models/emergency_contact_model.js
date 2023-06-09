const db = require('../config/config.db');

class EmergencyContact {
  static async create(name, phone, relationship, userId) {
    const query = `
      INSERT INTO emergency_contacts (name, phone, relationship, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [name, phone, relationship, userId];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create emergency contact.');
    }
  }
}

module.exports = EmergencyContact;

