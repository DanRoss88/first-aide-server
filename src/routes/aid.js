router.get('/aids', getAllAids);
router.get('/aids/:id', getAidById);
router.post('/aids', createAid);
router.put('/aids/:id', updateAid);
router.delete('/aids/:id', deleteAid);