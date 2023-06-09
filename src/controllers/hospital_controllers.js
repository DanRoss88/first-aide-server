const Hospital = require('../models/hospital_model');

// Get hospitals by city
async function getHospitalsByCity(req, res) {
  try {
    const hospitals = await Hospital.find({ city_id: req.params.city_id });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve hospitals' });
  }
}

// Get hospital by ID
async function getHospitalById(req, res) {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (hospital) {
      res.json(hospital);
    } else {
      res.status(404).json({ error: 'Hospital not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve hospital' });
  }
}

// Add new hospital
async function addHospital(req, res) {
  try {
    const newHospital = await Hospital.create(req.body);
    res.status(201).json(newHospital);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add hospital' });
  }
}

// Update hospital
async function updateHospital(req, res) {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedHospital) {
      res.json(updatedHospital);
    } else {
      res.status(404).json({ error: 'Hospital not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hospital' });
  }
}

// Delete hospital
async function deleteHospital(req, res) {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (deletedHospital) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Hospital not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hospital' });
  }
}

module.exports = {
  getHospitalsByCity,
  getHospitalById,
  addHospital,
  updateHospital,
  deleteHospital,
};