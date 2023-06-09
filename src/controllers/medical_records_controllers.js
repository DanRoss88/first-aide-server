// Medical Info Controller Functions

// Get user's medical information
async function getUserMedicalInfo(req, res) {
  try {
    const medicalInfo = await MedicalRecords.findOne({ user_id: req.params.user_id });
    if (medicalInfo) {
      res.json(medicalInfo);
    } else {
      res.status(404).json({ error: 'Medical information not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve medical information' });
  }
}

// Update user's medical information
async function updateUserMedicalInfo(req, res) {
  try {
    const updatedMedicalInfo = await MedicalRecords.findOneAndUpdate(
      { user_id: req.params.user_id },
      req.body,
      { new: true }
    );
    if (updatedMedicalInfo) {
      res.json(updatedMedicalInfo);
    } else {
      res.status(404).json({ error: 'Medical information not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update medical information' });
  }
}