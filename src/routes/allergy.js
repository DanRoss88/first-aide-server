router.get('/allergies/:medical_records_id', getAllergiesByMedicalRecords);
router.post('/allergies', createAllergy);
router.delete('/allergies/:id', deleteAllergy);