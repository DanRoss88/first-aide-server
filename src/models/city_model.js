const db = require('../config/config.db');

class City {
  static async create(name) {
    const query = `
      INSERT INTO cities (name)
      VALUES ($1)
      RETURNING id
    `;
    const values = [name];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create city.');
    }
  }
}

module.exports = City;
