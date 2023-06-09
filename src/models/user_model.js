const db = require('../config/config.db');

class User {
  static async create(username, email, cityId, bookmarkId) {
    const query = `
      INSERT INTO users (username, email, city_id, bookmark_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [username, email, cityId, bookmarkId];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }
}

module.exports = User;
