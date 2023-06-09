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

module.exports = userRouter;

// const { getAllUsers } = require("../controllers/user_controllers");
// router.get("/", getAllUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
