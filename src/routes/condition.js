const express = require('express');
const router = express.Router();
const { getConditionsByMedicalRecords, createCondition, deleteCondition } = require('../controllers/condition_controller');  

router.get('/conditions/:medical_records_id', getConditionsByMedicalRecords);
router.post('/conditions', createCondition);
router.delete('/conditions/:id', deleteCondition);

module.exports = router;