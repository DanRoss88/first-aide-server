// const Hospital = require('../models/hospital_model');

// // Get hospitals by city
// async function getHospitalsByCity(req, res) {
//   try {
//     const hospitals = await Hospital.find({ city_id: req.params.city_id });
//     res.json(hospitals);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve hospitals' });
//   }
// }

// // Get hospital by ID
// async function getHospitalById(req, res) {
//   try {
//     const hospital = await Hospital.findById(req.params.id);
//     if (hospital) {
//       res.json(hospital);
//     } else {
//       res.status(404).json({ error: 'Hospital not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve hospital' });
//   }
// }


// module.exports = {
//   getHospitalsByCity,
//   getHospitalById
// };