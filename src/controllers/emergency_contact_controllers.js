// const EmergencyContact = require('../models/emergency_contact_model');

// // Emergency Contact Controller Functions

// // Get user's emergency contacts
// async function getEmergencyContacts(req, res) {
//   try {
//     const emergencyContacts = await EmergencyContact.find({ user_id: req.params.user_id });
//     res.json(emergencyContacts);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve emergency contacts' });
//   }
// }

// // Add new emergency contact
// async function addEmergencyContact(req, res) {
//   try {
//     const newEmergencyContact = await EmergencyContact.create(req.body);
//     res.status(201).json(newEmergencyContact);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add emergency contact' });
//   }
// }

// // Update emergency contact
// async function updateEmergencyContact(req, res) {
//   try {
//     const updatedEmergencyContact = await EmergencyContact.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (updatedEmergencyContact) {
//       res.json(updatedEmergencyContact);
//     } else {
//       res.status(404).json({ error: 'Emergency contact not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update emergency contact' });
//   }
// }

// // Delete emergency contact
// async function deleteEmergencyContact(req, res) {
//   try {
//     const deletedEmergencyContact = await EmergencyContact.findByIdAndDelete(req.params.id);
//     if (deletedEmergencyContact) {
//       res.sendStatus(204);
//     } else {
//       res.status(404).json({ error: 'Emergency contact not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete emergency contact' });
//   }
// }

// module.exports = {
//   getEmergencyContacts,
//   addEmergencyContact,
//   updateEmergencyContact,
//   deleteEmergencyContact,
// };