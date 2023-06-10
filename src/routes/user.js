const express = require("express");
const userRouter = express.Router();
const database = require("../config/config.db");

userRouter.get("/", async (req, res) => {
  try {
    const users = await database.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, email, city } = req.body;

    // Check if user already exists
    const user = await database.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json({ error: "User already exists." });
    }

    // Retrieve city information
    const cityResult = await database.query(
      "SELECT * FROM city WHERE name = $1",
      [city]
    );
    if (cityResult.rows.length === 0) {
      return res.status(401).json({ error: "City does not exist." });
    }

    const cityId = cityResult.rows[0].id;

    // Insert new user
    const newUser = await database.query(
      "INSERT INTO users (username, email, city_id) VALUES ($1, $2, $3) RETURNING *",
      [username, email, cityId]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user.", problem: error });
  }
});

module.exports = userRouter;

// const { getAllUsers } = require("../controllers/user_controllers");
// router.get("/", getAllUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
