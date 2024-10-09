const Pool = require("../config/db");

// SELECT Comments
const selectComments = (recipe_id) => {
  return Pool.query(
     `SELECT comments.comment_id, comments.comment_text, users.user_name, users.user_photo, comments.created_at
    FROM comments
    LEFT JOIN users
    ON comments.user_id = users.user_id
    WHERE comments.recipe_id = '${recipe_id}'`
  );
};

// INSERT Comments
const insertComments = (data) => {
  const { comment_id, recipe_id, user_id, comment_text } = data;
  return Pool.query(
    `INSERT INTO comments (comment_id, recipe_id, user_id, comment_text) 
    VALUES('${comment_id}', '${recipe_id}', '${user_id}', '${comment_text}' )`
  );
};

// UPDATE Comments
const updateComments = (data) => {
  const { comment_id, comment_text } = data;
  return Pool.query(
    `UPDATE comments SET  comment_text='${comment_text}' WHERE comment_id='${comment_id}'`
  );
};

// DELETE Comments
const deleteComments = (comment_id) => {
  return Pool.query(`DELETE FROM comments WHERE comment_id='${comment_id}'`);
};

// FINDID
const findID = (comment_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT comments FROM comments WHERE comment_id='${comment_id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  selectComments,
  insertComments,
  updateComments,
  deleteComments,
  findID,
};
