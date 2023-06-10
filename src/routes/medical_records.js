const express = require('express');
const mRRouter = express.Router();
const db = require('../config/config.db');
const { getUserMedicalInfo, updateUserMedicalInfo } = require('../controllers/medical_records_controllers');  
const { getAllergiesByMedicalRecords, createAllergy, deleteAllergy, editAllergy } = require('../controllers/allergy_controllers');
const { getConditionsByMedicalRecords, createCondition, deleteCondition, editCondition } = require('../controllers/condition_controllers');
const { getMedicationsByMedicalRecords, createMedication, deleteMedication, editMedication } = require('../controllers/medication_controllers');

////////////////////////////// MEDICAL RECORDS //////////////////////////////

// Display all medical records
mRRouter.get('/', (req, res) => {
  db.query('SELECT * FROM medical_records ')
    .then((data) => {
      res.json(data.rows);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// GET USER'S MEDICAL INFORMATION
mRRouter.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  getUserMedicalInfo(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// UPDATE USER'S MEDICAL INFORMATION
mRRouter.put('/:userId/:medicalRecordId', (req, res) => {
  const userId = req.params.userId;
  const medicalRecordId = req.params.medicalRecordId;

  updateUserMedicalInfo(userId, medicalRecordId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// ALLERGIES

// Get allergies by medical records ID
mRRouter.get('/allergies/:medicalRecordsId', (req, res) => {
  const medicalRecordsId = req.params.medicalRecordsId;

  getAllergiesByMedicalRecords(medicalRecordsId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Create a new allergy
mRRouter.post('/allergies', (req, res) => {
  const { medicalRecordId, allergyName, allergySeverity } = req.body;
  
  createAllergy( medicalRecordId, allergyName, allergySeverity)
    .then((data) => {
      res.json(data);
      console.log('Allergy created');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Delete user allergy by ID
mRRouter.delete('/allergies/:allergyId/:medicalRecordsId', (req, res) => {
  const allergyId = req.params.allergyId;
  const medicalRecordsId = req.params.medicalRecordsId;

  deleteAllergy(allergyId, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log('Allergy deleted');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Edit user allergy by ID
mRRouter.put('/allergies/:allergyId/:medicalRecordsId', (req, res) => {
  const allergyId = req.params.allergyId;
  const medicalRecordsId = req.params.medicalRecordsId;
  const { allergyName, allergySeverity } = req.body;

  editAllergy(allergyId, allergyName, allergySeverity, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log('Allergy edited');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


/////// CONDITIONS ///////   

// Get conditions by medical records ID

mRRouter.get('/conditions/:medicalRecordsId', (req, res) => {
  const medicalRecordsId = req.params.medicalRecordsId;

  getConditionsByMedicalRecords(medicalRecordsId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Create a new condition

mRRouter.post('/conditions', (req, res) => {
  const { medicalRecordId, conditionName } = req.body;

  createCondition(medicalRecordId, conditionName)
    .then((data) => {
      res.json(data);
      console.log('Condition created');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Delete user condition by ID

mRRouter.delete('/conditions/:conditionId/:medicalRecordsId', (req, res) => {
  const conditionId = req.params.conditionId;
  const medicalRecordsId = req.params.medicalRecordsId;

  deleteCondition(conditionId, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log('Condition deleted');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Edit user condition by ID

mRRouter.put('/conditions/:conditionId/:medicalRecordsId', (req, res) => {
  const conditionId = req.params.conditionId;
  const medicalRecordsId = req.params.medicalRecordsId;
  const { conditionName } = req.body;

  editCondition(conditionId, conditionName, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log('Condition edited');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


////// MEDICATIONS //////

// Get medications by medical records ID

mRRouter.get('/medications/:medicalRecordsId', (req, res) => {
  const medicalRecordsId = req.params.medicalRecordsId;

  getMedicationsByMedicalRecords(medicalRecordsId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Create a new medication

mRRouter.post('/medications', (req, res) => {
  const { medicalRecordId, medicationName } = req.body;

  createMedication(medicalRecordId, medicationName)
    .then((data) => {
      res.json(data);
      console.log('Medication created');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Delete user medication by ID

mRRouter.delete('/medications/:medicationId/:medicalRecordsId', (req, res) => {
  const medicationId = req.params.medicationId;
  const medicalRecordsId = req.params.medicalRecordsId;

  deleteMedication(medicationId, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log('Medication deleted');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Edit user medication by ID

mRRouter.put('/medications/:medicationId/:medicalRecordsId', (req, res) => {
  const medicationId = req.params.medicationId;
  const medicalRecordsId = req.params.medicalRecordsId;
  const { medicationName } = req.body;

  editMedication(medicationId, medicationName, medicalRecordsId)
    .then((data) => {
      res.json(data);
      console.log('Medication edited');
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});



module.exports = mRRouter;