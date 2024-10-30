const Pool = require("../config/db");

// SELECT BY USER
const selectLikeds = (user_id) => {
  return Pool.query(`
  SELECT likeds.liked_id, users.user_name as recipe_by, recipes.recipe_title, recipes.recipe_thumbnail, categories.category_name, likeds.created_at
  FROM likeds
  LEFT JOIN recipes ON likeds.recipe_id = recipes.recipe_id
  LEFT JOIN users ON recipes.user_id = users.user_id
  LEFT JOIN categories ON recipes.category_id = categories.category_id
  WHERE likeds.user_id = '${user_id}'
  `);
};

// INSERT
const insertLikeds = (data) => {
  const { liked_id, recipe_id, user_id } = data;
  return Pool.query(
    `INSERT INTO likeds (liked_id, recipe_id, user_id) 
    VALUES('${liked_id}', '${recipe_id}', '${user_id}' )`
  );
};

// DELETE
const deleteLikeds = (liked_id) => {
  return Pool.query(`DELETE FROM likeds WHERE liked_id='${liked_id}'`);
};

// FIND ID
const findID = (liked_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT likeds FROM Likeds WHERE liked_id='${liked_id}'`,
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
      `SELECT likeds FROM Likeds WHERE recipe_id='${recipe_id}'`,
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
      `SELECT likeds FROM Likeds WHERE user_id='${user_id}'`,
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
  selectLikeds,
  insertLikeds,
  deleteLikeds,
  findID,
  findRecipeID,
  findUserID,
};
