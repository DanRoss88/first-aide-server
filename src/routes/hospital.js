const express = require('express');
const router = express.Router();
const { getHospitalsByCity, getHospitalById } = require('../controllers/hospital_controller'); 

router.get('/hospitals/:city_id', getHospitalsByCity);
router.get('/hospitals/:id', getHospitalById);

module.exports = router;