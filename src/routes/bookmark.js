const express = require("express");
const bookmarkRouter = express.Router();

const getUserId = require("../helpers/getUserId");

const {
  getAllBookmarks,
  createBookmark,
  deleteBookmark,
  editBookmark,
} = require("../controllers/bookmark_controllers");

// Get all bookmarks by user ID
bookmarkRouter.get("/", (req, res) => {
  const userId = getUserId(req);
  getAllBookmarks(userId)
    .then((bookmarks) => {
      res.json(bookmarks);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve bookmarks" });
    });
});

// Create a new bookmark
bookmarkRouter.post("/", (req, res) => {
  const { title, instruction } = req.body;
  const userId = getUserId(req);
  createBookmark(title, instruction, userId)
    .then((bookmark) => {
      res.json(bookmark);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create bookmark" });
    });
});

// Edit a bookmark title
bookmarkRouter.post("/edit", (req, res) => {
  const { bookmarkId, title } = req.body;
  const userId = getUserId(req);

  editBookmark(title, bookmarkId, userId)
    .then((bookmark) => {
      res.json(bookmark);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to edit bookmark title" });
    });
});

// Delete a bookmark by bookmark ID
bookmarkRouter.delete("/:bookmarkId", (req, res) => {
  const { bookmarkId } = req.params;
  const userId = getUserId(req);
  deleteBookmark(bookmarkId, userId)
    .then((bookmark) => {
      res.json(bookmark);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete bookmark" });
    });
});

module.exports = bookmarkRouter;
