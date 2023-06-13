const express = require("express");
const bookmarkRouter = express.Router();

const getUserId = require("../helpers/getUserId");

const {
  getAllBookmarks,
  createBookmark,
  deleteBookmark,
  editBookmark,
} = require("../controllers/bookmark_controllers");

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
      console.log("Bookmark created");
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create bookmark" });
    });
});

//// Edit a bookmark title

bookmarkRouter.post("/edit", (req, res) => {
  const { bookmarkId, title } = req.body;
  const userId = getUserId(req);

  console.log(bookmarkId, title, userId);

  editBookmark(title, bookmarkId, userId)
    .then((bookmark) => {
      res.json(bookmark);
      console.log(bookmark, "Bookmark title edited");
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to edit bookmark title" });
    });
});

//// Delete a bookmark by bookmark ID
bookmarkRouter.delete("/:bookmarkId", (req, res) => {
  const { bookmarkId } = req.params;
  const userId = getUserId(req);
  deleteBookmark(bookmarkId, userId)
    .then((bookmark) => {
      res.json(bookmark);
      console.log("Bookmark deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete bookmark" });
    });
});

module.exports = bookmarkRouter;
