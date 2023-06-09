const Aid = require('../models/aid_model');

// Aid Controller Functions

// Get all aids
async function getAllAids(req, res) {
  try {
    const aids = await Aid.find();
    res.json(aids);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve aids' });
  }
}

// Get aid by ID
async function getAidById(req, res) {
  try {
    const aid = await Aid.findById(req.params.id);
    if (aid) {
      res.json(aid);
    } else {
      res.status(404).json({ error: 'Aid not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve aid' });
  }
}

// Create new aid
async function createAid(req, res) {
  try {
    const newAid = await Aid.create(req.body);
    res.status(201).json(newAid);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create aid' });
  }
}

// Update aid
async function updateAid(req, res) {
  try {
    const updatedAid = await Aid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedAid) {
      res.json(updatedAid);
    } else {
      res.status(404).json({ error: 'Aid not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update aid' });
  }
}

// Delete aid
async function deleteAid(req, res) {
  try {
    const deletedAid = await Aid.findByIdAndDelete(req.params.id);
    if (deletedAid) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Aid not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete aid' });
  }
}

module.exports = {
  getAllAids,
  getAidById,
  createAid,
  updateAid,
  deleteAid
};