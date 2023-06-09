router.get('/bookmarks', getAllBookmarks);
router.get('/bookmarks/:id', getBookmarkById);
router.post('/bookmarks', createBookmark);
router.delete('/bookmarks/:id', deleteBookmark);