const express = require("express");
const userRouter = express.Router();
const database = require("../config/config.db");
const getUserId = require("../helpers/getUserId");

// Get one user
userRouter.get("/", async (req, res) => {
  const userId = getUserId(req);

  try {
    const users = await database.query(
      `SELECT users.id, username, email, city.name AS city FROM users 
    JOIN city ON users.city_id = city.id
    WHERE users.id = $1`,
      [userId]
    );
    res.json(users.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

// Update one user
userRouter.post("/", async (req, res) => {
  const userId = getUserId(req);
  const { username, email, city } = req.body;

  try {
    const cityResult = await database.query(
      "SELECT * FROM city WHERE name = $1",
      [city]
    );
    if (cityResult.rows.length === 0) {
      return res.status(401).json({ error: "City does not exist." });
    }

    const cityId = cityResult.rows[0].id;

    const updatedUser = await database.query(
      "UPDATE users SET username = $1, email = $2, city_id = $3 WHERE id = $4 RETURNING *",
      [username, email, cityId, userId]
    );
    res.json(updatedUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
});

module.exports = userRouter;
