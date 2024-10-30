const Pool = require("../config/db");

// SELECT BY USER
const selectBookmarks = (user_id) => {
  return Pool.query(`
  SELECT bookmarks.bookmark_id, users.user_name as recipe_by, recipes.recipe_title, recipes.recipe_thumbnail, categories.category_name, bookmarks.created_at
  FROM bookmarks
  LEFT JOIN recipes ON bookmarks.recipe_id = recipes.recipe_id
  LEFT JOIN users ON recipes.user_id = users.user_id
  LEFT JOIN categories ON recipes.category_id = categories.category_id
  WHERE bookmarks.user_id = '${user_id}'
  `);
};

// INSERT
const insertBookmarks = (data) => {
  const { bookmark_id, recipe_id, user_id } = data;
  return Pool.query(
    `INSERT INTO bookmarks (bookmark_id, recipe_id, user_id) 
    VALUES('${bookmark_id}', '${recipe_id}', '${user_id}' )`
  );
};

// DELETE
const deleteBookmarks = (bookmark_id) => {
  return Pool.query(
    `DELETE FROM bookmarks WHERE bookmark_id='${bookmark_id}'`
  );
};

// FINDID
const findID = (bookmark_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT bookmarks FROM bookmarks WHERE bookmark_id='${bookmark_id}'`,
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

const findRecipeID = (recipe_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM bookmarks WHERE recipe_id='${recipe_id}'`,
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

const findUserID = (user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM bookmarks WHERE user_id='${user_id}'`,
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
  selectBookmarks,
  insertBookmarks,
  deleteBookmarks,
  findRecipeID,
  findUserID,
  findID,
};
