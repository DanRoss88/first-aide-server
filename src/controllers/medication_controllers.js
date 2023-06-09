// const Medication = require('../models/Medication');

// // Get medications by medical records ID
// async function getMedicationsByMedicalRecords(req, res) {
//   const { medical_records_id } = req.params;

//   try {
//     const medications = await Medication.findByMedicalRecordsId(medical_records_id);
//     res.json(medications);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve medications.' });
//   }
// }

// // Create a new medication
// async function createMedication(req, res) {
//   const { name, medical_records_id } = req.body;

//   try {
//     const medication = await Medication.create(name, medical_records_id);
//     res.status(201).json(medication);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create medication.' });
//   }
// }

// // Delete medication by ID
// async function deleteMedication(req, res) {
//   const { id } = req.params;

//   try {
//     const medication = await Medication.deleteById(id);
//     if (!medication) {
//       return res.status(404).json({ error: 'Medication not found.' });
//     }
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete medication.' });
//   }
// }

// module.exports = {
//   getMedicationsByMedicalRecords,
//   createMedication,
//   deleteMedication,
// };
