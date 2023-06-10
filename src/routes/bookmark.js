const express = require('express');
const bookmarkRouter = express.Router();
const { getAllBookmarks, createBookmark, deleteBookmark } = require('../controllers/bookmark_controllers');

// // Get all bookmarks by user ID
// bookmarkRouter.get('/:userID', (req, res) => {
//   const userId = req.params.userID;

//   getAllBookmarks(userId)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Get bookmark by bookmark ID
// bookmarkRouter.get('/bookmark/:bookmarkId', (req, res) => {
//   const bookmarkId = req.params.bookmarkId;

//   getBookmarkById(bookmarkId)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Create a new bookmark
// bookmarkRouter.post('/', (req, res) => {
//   const userId = req.body.userID;
//   const instructionsId  = req.body;

//   createBookmark(instructionsId, userId)
//     .then((data) => {
//       res.json(data);
//       console.log('Bookmark created');
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Delete user bookmark by ID
// bookmarkRouter.delete('/:bookmarkId', (req, res) => {
//   const bookmarkId = req.params.bookmarkId;
//   const { userId, instructionsId } = req.body;

//   deleteBookmark(instructionsId, userId)
//     .then((data) => {
//       res.json(data);
//       console.log('Bookmark deleted');
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });


// Get all bookmarks by user ID
bookmarkRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  getAllBookmarks(userId)
    .then((bookmarks) => {
      res.json(bookmarks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve bookmarks' });
    });
});


// Create a new bookmark
bookmarkRouter.post('/', (req, res) => {
  const { userId, title, instructions } = req.body;
  createBookmark(title, instructions, userId)
    .then((bookmark) => {
      res.json(bookmark);
      console.log('Bookmark created');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create bookmark' });
    });
});


// Delete a bookmark by bookmark ID
bookmarkRouter.delete('/:bookmarkId', (req, res) => {
  const { bookmarkId } = req.params;
  deleteBookmark(bookmarkId)
    .then((bookmark) => {
      res.json(bookmark);
      console.log('Bookmark deleted');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete bookmark' });
    });
});

module.exports = bookmarkRouter;