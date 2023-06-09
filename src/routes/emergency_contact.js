router.get('/emergency-contacts/:user_id', getEmergencyContacts);
router.post('/emergency-contacts/:user_id', addEmergencyContact);
router.put('/emergency-contacts/:id', updateEmergencyContact);
router.delete('/emergency-contacts/:id', deleteEmergencyContact);