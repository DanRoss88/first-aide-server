const express = require('express');
const emergContRouter = express.Router();
const { getAllEmergencyContacts, createEmergencyContact, deleteEmergencyContact } = require('../controllers/emergency_contact_controllers');


///// Emergency Contact Routes /////

// Get all emergency contacts by user ID

emergContRouter.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  getAllEmergencyContacts(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
  }
);

// Create a new emergency contact

emergContRouter.post('/', (req, res) => {

  const { userId, contactName, phone, relationship } = req.body;

  createEmergencyContact(userId, contactName, phone, relationship)
    .then((data) => {
      res.json(data);
      console.log('Emergency Contact created');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
}
);

// Delete user emergency contact by ID

emergContRouter.delete('/:emergencyContactId', (req, res) => {
  const emergencyContactId = req.params.emergencyContactId;
  const userId = req.body.userId;

  deleteEmergencyContact(emergencyContactId, userId)
    .then((data) => {
      res.json(data);
      console.log('Emergency Contact deleted');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
}
);

module.exports = emergContRouter;