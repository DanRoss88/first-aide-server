const db = require('../config/config.db');

class MedicalRecords {
  static async create(userId) {
    const query = `
      INSERT INTO medical_records (user_id)
      VALUES ($1)
      RETURNING id
    `;
    const values = [userId];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create medical records.');
    }
  }
}

module.exports = MedicalRecords;
