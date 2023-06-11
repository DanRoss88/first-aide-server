const express = require("express");
const hospitalRouter = express.Router();
const {
  getAllHospitalsByUserCity,
} = require("../controllers/hospital_controllers");
const jwt = require("jsonwebtoken");

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

hospitalRouter.get("/", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token." });
    userId = payload.user_id;
  });

  getAllHospitalsByUserCity(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = hospitalRouter;
