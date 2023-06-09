const Bookmark = require('../models/bookmark');

// Bookmark Controller Functions

// Get all bookmarks
async function getAllBookmarks(req, res) {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve bookmarks' });
  }
}

// Get bookmark by ID
async function getBookmarkById(req, res) {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (bookmark) {
      res.json(bookmark);
    } else {
      res.status(404).json({ error: 'Bookmark not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve bookmark' });
  }
}

// Create new bookmark
async function createBookmark(req, res) {
  try {
    const newBookmark = await Bookmark.create(req.body);
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
}

// Delete bookmark
async function deleteBookmark(req, res) {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (deletedBookmark) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Bookmark not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
}

module.exports = {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmark,
};