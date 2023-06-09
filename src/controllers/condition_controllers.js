const Condition = require('../models/Condition');

// Create a new condition
async function createCondition(req, res) {
  const { name, medicalRecordsId } = req.body;

  try {
    const conditionId = await Condition.create(name, medicalRecordsId);
    res.status(201).json({ id: conditionId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create condition.' });
  }
}

module.exports = {
  createCondition,
};