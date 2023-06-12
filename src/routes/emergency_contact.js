const express = require("express");
const emergContRouter = express.Router();
const {
  getAllEmergencyContacts,
  createEmergencyContact,
  deleteEmergencyContact,
} = require("../controllers/emergency_contact_controllers");
const jwt = require("jsonwebtoken");

///// Emergency Contact Routes /////

// Get all emergency contacts by user ID

emergContRouter.get("/", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log(token);
  let userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token." });
    userId = payload.user_id;
  });

  getAllEmergencyContacts(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Create a new emergency contact

emergContRouter.post("/", (req, res) => {
  const { contactName, phone, relationship } = req.body;

  const token = req.headers.authorization.split(" ")[1];

  console.log(token);
  let userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token." });
    userId = payload.user_id;
  });

  createEmergencyContact(userId, contactName, phone, relationship)
    .then((data) => {
      res.json(data);
      console.log("Emergency Contact created");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user emergency contact by ID

emergContRouter.delete("/:emergencyContactId", (req, res) => {
  const emergencyContactId = req.params.emergencyContactId;
  const userId = req.body.userId;

  deleteEmergencyContact(emergencyContactId, userId)
    .then((data) => {
      res.json(data);
      console.log("Emergency Contact deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = emergContRouter;
