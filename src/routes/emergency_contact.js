const express = require("express");
const emergContRouter = express.Router();
const {
  getAllEmergencyContacts,
  createEmergencyContact,
  deleteEmergencyContact,
} = require("../controllers/emergency_contact_controllers");
const getUserId = require("../helpers/getUserId");

///// Emergency Contact Routes /////

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
  const { contactName, phone, relationship } = req.body;

  const userId = await getUserId(req);

  createEmergencyContact(userId, contactName, phone, relationship)
    .then((data) => {
      res.json(data);
      console.log("Emergency Contact created");
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
      console.log("Emergency Contact deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = emergContRouter;
