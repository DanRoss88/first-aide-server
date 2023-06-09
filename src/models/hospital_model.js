const db = require('../config/config.db');

class Hospital {
  static async create(cityId, name, address, phone, hours, erExists) {
    const query = `
      INSERT INTO hospitals (city_id, name, address, phone, hours, er_exists)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [cityId, name, address, phone, hours, erExists];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create hospital.');
    }
  }
}

module.exports = Hospital;
