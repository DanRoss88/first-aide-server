router.get('/medications/:medical_records_id', getMedicationsByMedicalRecords);
router.post('/medications', createMedication);
router.delete('/medications/:id', deleteMedication);