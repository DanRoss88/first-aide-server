const City = require('../models/City');

// Create a new city
async function createCity(req, res) {
  const { name } = req.body;

  try {
    const cityId = await City.create(name);
    res.status(201).json({ id: cityId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create city.' });
  }
}

module.exports = {
  createCity,
};
