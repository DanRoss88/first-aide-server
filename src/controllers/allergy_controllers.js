// const Allergy = require('../models/Allergy');

// // Get allergies by medical records ID
// async function getAllergiesByMedicalRecords(req, res) {
//   const { medical_records_id } = req.params;

//   try {
//     const allergies = await Allergy.findByMedicalRecordsId(medical_records_id);
//     res.json(allergies);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve allergies.' });
//   }
// }

// // Create a new allergy
// async function createAllergy(req, res) {
//   const { name, medical_records_id } = req.body;

//   try {
//     const allergy = await Allergy.create(name, medical_records_id);
//     res.status(201).json(allergy);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create allergy.' });
//   }
// }

// // Delete allergy by ID
// async function deleteAllergy(req, res) {
//   const { id } = req.params;

//   try {
//     const allergy = await Allergy.deleteById(id);
//     if (!allergy) {
//       return res.status(404).json({ error: 'Allergy not found.' });
//     }
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete allergy.' });
//   }
// }

// module.exports = {
//   getAllergiesByMedicalRecords,
//   createAllergy,
//   deleteAllergy,
// };
