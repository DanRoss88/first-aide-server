const express = require('express');
const router = express.Router();
const { getAllBookmarks, getBookmarkById, createBookmark, deleteBookmark } = require('../controllers/bookmark_controller');  


router.get('/bookmarks', getAllBookmarks);
router.get('/bookmarks/:id', getBookmarkById);
router.post('/bookmarks', createBookmark);
router.delete('/bookmarks/:id', deleteBookmark);

module.exports = router;