const db = require('../config/config.db');

class Bookmark {
  static async create(aidId) {
    const query = `
      INSERT INTO bookmarks (aid_id)
      VALUES ($1)
      RETURNING id
    `;
    const values = [aidId];

    try {
      const result = await db.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create bookmark.');
    }
  }
}

module.exports = Bookmark;
