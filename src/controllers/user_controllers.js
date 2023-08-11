// const User = require('../models/User');

// // Get all users
// async function getAllUsers(req, res) {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve users.' });
//   }
// }

// // Get user by ID
// async function getUserById(req, res) {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve user.' });
//   }
// }

// // Create a new user
// async function createUser(req, res) {
//   const { username, email } = req.body;

//   try {
//     const user = await User.create(username, email);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user.' });
//   }
// }

// // Update user by ID
// async function updateUser(req, res) {
//   const { id } = req.params;
//   const { username, email } = req.body;

//   try {
//     const user = await User.update(id, username, email);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update user.' });
//   }
// }

// // Delete user by ID
// async function deleteUser(req, res) {
//   const { id } = req.params;

//   try {
//     const user = await User.deleteById(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete user.' });
//   }
// }

// module.exports = {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// };
