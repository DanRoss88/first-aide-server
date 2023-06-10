const db = require('../config/config.db');


// Bookmark Controller Functions

// Get all bookmarks by user ID

const getAllBookmarks = (userId) => {

  return db
    .query('SELECT * FROM bookmark WHERE users_id = $1', [userId])
    .then((data) => data.rows)
    .catch((err) => {
      console.log('Error retrieving bookmarks:', err);
      throw err;
    });
  };

// Get bookmark by ID

const getBookmarkById = (bookmarkId) => {

  return db
    .query('SELECT * FROM bookmark WHERE id = $1', [bookmarkId])
    .then((data) => data.rows[0])
    .catch((err) => {
      console.log('Error retrieving bookmark:', err);
      throw err;
    });
  };

  /// create a bookmark from instructions ID

  const createBookmark = (instructionsId, userId) => {

    return db
      .query('INSERT INTO bookmark (instructions_id, users_id) VALUES ($1, $2) RETURNING *', [instructionsId, userId])
      .then((data) => {
        const bookmark = data.rows[0];
        // Update the 'bookmarked' value in the instructions table to true
        return db
          .query('UPDATE instructions SET bookmarked = true WHERE id = $1', [instructionsId])
          .then(() => bookmark)
          .catch((err) => {
            console.log('Error updating instructions:', err);
            throw err;
          });
      })
      .catch((err) => {
        console.log('Error creating bookmark:', err);
        throw err;
      });
  };


//// delete a bookmark from instructions ID 

const deleteBookmark = (instructionsId, userId) => {

  return db
    .query('DELETE FROM bookmark WHERE instructions_id = $1 AND users_id = $2 RETURNING *', [instructionsId, userId])
    .then((data) => {
      const bookmark = data.rows[0];
      // Update the 'bookmarked' value in the instructions table to false
      
      return db
        .query('UPDATE instructions SET bookmarked = false WHERE id = $1', [instructionsId])
        .then(() => bookmark)
        .catch((err) => {
          console.log('Error updating instructions:', err);
          throw err;
        });
    })
    .catch((err) => {
      console.log('Error deleting bookmark:', err);
      throw err;
    });
};


module.exports = {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmark,
};