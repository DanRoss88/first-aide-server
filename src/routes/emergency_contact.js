const express = require("express");
const emergContRouter = express.Router();
const {
  getAllEmergencyContacts,
  createEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContactById,
} = require("../controllers/emergency_contact_controllers");
const getUserId = require("../helpers/getUserId");

// Get all emergency contacts by user ID

emergContRouter.get("/", async (req, res) => {
  const userId = await getUserId(req);
  getAllEmergencyContacts(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Create a new emergency contact

emergContRouter.post("/", async (req, res) => {
  const { name, phone, relationship } = req.body;

  const userId = await getUserId(req);

  createEmergencyContact(userId, name, phone, relationship)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

// Delete user emergency contact by contactId

emergContRouter.delete("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  const userId = await getUserId(req);

  deleteEmergencyContact(contactId, userId)
    .then((data) => {
      res.send("Emergency Contact deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

emergContRouter.get("/:id", async (req, res) => {
  const userId = await getUserId(req);
  const contactId = req.params.id;

  getEmergencyContactById(contactId, userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = emergContRouter;
