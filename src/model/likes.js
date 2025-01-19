const Pool = require("../config/db");

// SELECT BY USER
const selectLikes = (user_id) => {
  return Pool.query(`
  SELECT likes.like_id, users.user_name as recipe_by, recipes.recipe_title, recipes.recipe_thumbnail, categories.category_name, likes.created_at
  FROM likes
  LEFT JOIN recipes ON likes.recipe_id = recipes.recipe_id
  LEFT JOIN users ON recipes.user_id = users.user_id
  LEFT JOIN categories ON recipes.category_id = categories.category_id
  WHERE likes.user_id = '${user_id}'
  `);
};

// INSERT
const insertLikes = (data) => {
  const { like_id, recipe_id, user_id } = data;
  return Pool.query(
    `INSERT INTO likes (like_id, recipe_id, user_id) 
    VALUES('${like_id}', '${recipe_id}', '${user_id}' )`
  );
};

// DELETE
const deleteLikes = (like_id) => {
  return Pool.query(`DELETE FROM likes WHERE like_id='${like_id}'`);
};

// FIND ID
const findID = (like_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT like_id FROM Likes WHERE like_id='${like_id}'`,
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

const findLike = (recipe_id, user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM Likes WHERE recipe_id='${recipe_id}' AND user_id='${user_id}'`,
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
  selectLikes,
  insertLikes,
  deleteLikes,
  findID,
  findLike,
};
