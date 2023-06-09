const pool = require('../config/config.db');

class Aid {
  static async create(tag, patterns, responses, contextSet, bookmarked) {
    const query = `
      INSERT INTO aids (tag, patterns, responses, context_set, bookmarked)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [tag, patterns, responses, contextSet, bookmarked];

    try {
      const result = await pool.one(query, values);
      return result.id;
    } catch (error) {
      throw new Error('Failed to create aid.');
    }
  }
}

module.exports = Aid;
