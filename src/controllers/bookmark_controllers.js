const db = require("../config/config.db");

// Get all bookmarks by user ID
const getAllBookmarks = (userId) => {
  return db
    .query("SELECT * FROM bookmark WHERE users_id = $1", [userId])
    .then((data) => data.rows)
    .catch((err) => {
      throw err;
    });
};

// Create a bookmark
const createBookmark = (title, instructions, userId) => {
  return db
    .query(
      "INSERT INTO bookmark (title, instruction, users_id) VALUES ($1, $2, $3) RETURNING *",
      [title, instructions, userId]
    )
    .then((data) => data.rows[0])
    .catch((err) => {
      throw err;
    });
};

// Edit a bookmark

const editBookmark = (title, bookmarkId, userId) => {
  return db
    .query(
      "UPDATE bookmark SET title = $1 WHERE id = $2 AND users_id = $3 RETURNING *",
      [title, bookmarkId, userId]
    )
    .then((data) => {
      if (!data.rows[0]) {
        throw new Error("Bookmark not found");
      }
      return data.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

// Delete a bookmark
const deleteBookmark = (bookmarkId, userId) => {
  return db
    .query("DELETE FROM bookmark WHERE id = $1 AND users_id = $2 RETURNING *", [
      bookmarkId,
      userId,
    ])
    .then((data) => data.rows[0])
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getAllBookmarks,
  createBookmark,
  editBookmark,
  deleteBookmark,
};
