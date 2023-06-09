const db = require('../config/config.db');

class Medication {
  static async create(name, medicalRecordsId) {
    const query = `
      INSERT INTO medications (name, medical_records_id)
      VALUES ($1, $2)
      RETURNING id
    `;
    const values = [name, medicalRecordsId];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create medication.');
    }
  }
}

module.exports = Medication;