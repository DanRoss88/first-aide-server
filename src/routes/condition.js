router.get('/conditions/:medical_records_id', getConditionsByMedicalRecords);
router.post('/conditions', createCondition);
router.delete('/conditions/:id', deleteCondition);