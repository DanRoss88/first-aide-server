const express = require("express");
const hospitalRouter = express.Router();
const {
  getAllHospitalsByUserCity,
} = require("../controllers/hospital_controllers");
const jwt = require("jsonwebtoken");

// Get all hospitals by user city ID

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
