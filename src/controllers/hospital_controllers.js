const db = require("../config/config.db");

// Get all hospitals by user city ID

const getAllHospitalsByUserCity = (userId) => {
  return db
    .query(
      "SELECT * FROM hospital WHERE city_id = (SELECT city_id FROM users WHERE id = $1)",
      [userId]
    )
    .then((data) => data.rows)
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getAllHospitalsByUserCity,
};
