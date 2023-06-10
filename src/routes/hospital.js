const express = require('express');
const hospitalRouter = express.Router();
const { getAllHospitalsByUserCity } = require('../controllers/hospital_controllers');




///// Hospital Routes /////

// Get all hospitals by city ID // STRETCH// NEARBY CITIES HOSPTIALS ///

// hospitalRouter.get('/:cityId', (req, res) => {
// const cityId = req.params.cityId;

// getAllHospitals(cityId)
//   .then((data) => {
//     res.json(data);
//   })
//   .catch((error) => {
//     res.status(500).json({ error: 'An error occurred' });
//   });
// });

/// Get all hospitals by user city ID

hospitalRouter.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  getAllHospitalsByUserCity(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
  });


module.exports = hospitalRouter;