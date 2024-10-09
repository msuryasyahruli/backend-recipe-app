const Pool = require("../config/db");

// GET ALL RECIPES
const selectAllRecipes = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT recipes.recipe_id, recipes.recipe_title, recipes.recipe_ingredients, recipes.recipe_thumbnail, recipes.recipe_video, recipes.created_at, users.user_name as recipe_by
  FROM recipes
  LEFT JOIN users ON recipes.user_id = users.user_id
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

// SELECT RECIPES DETAIL
const selectRecipesDetail = (recipe_id) => {
  return Pool.query(`
  SELECT recipes.recipe_id, recipes.recipe_title, recipes.recipe_ingredients, recipes.recipe_thumbnail, recipes.recipe_video, recipes.created_at, users.user_name as recipe_by
  FROM recipes
  LEFT JOIN users ON recipes.user_id = users.user_id
  WHERE recipes.recipe_id='${recipe_id}'`);
};

// INSERT RECIPES
const insertRecipes = (data) => {
  const {
    recipe_id,
    recipe_title,
    recipe_ingredients,
    recipe_thumbnail,
    recipe_video,
    category_id,
    user_id,
  } = data;
  return Pool.query(
    `INSERT INTO recipes (recipe_id, recipe_title, recipe_ingredients, recipe_thumbnail, recipe_video, category_id, user_id) VALUES('${recipe_id}', '${recipe_title}', '${recipe_ingredients}', '${recipe_thumbnail}', '${recipe_video}', '${category_id}', '${user_id}')`
  );
};

// UPDATE RECIPES
const updateRecipes = (data) => {
  const {
    recipe_id,
    recipe_title,
    recipe_ingredients,
    recipe_thumbnail,
    recipe_video,
  } = data;
  const fields = [];
  if (recipe_title) fields.push(`recipe_title='${recipe_title}'`);
  if (recipe_ingredients)
    fields.push(`recipe_ingredients='${recipe_ingredients}'`);
  if (recipe_thumbnail) fields.push(`recipe_thumbnail='${recipe_thumbnail}'`);
  if (recipe_video) fields.push(`recipe_video='${recipe_video}'`);
  if (fields.length === 0) {
    return null;
  }
  const query = `UPDATE recipes SET ${fields.join(
    ", "
  )} WHERE recipe_id='${recipe_id}'`;
  return Pool.query(query);
};

// DELETE RECIPES
const deleteRecipes = (recipe_id) => {
  return Pool.query(`DELETE FROM recipes WHERE recipe_id='${recipe_id}'`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM recipes");
};

// FIND UUID
const findID = (recipe_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT recipes FROM recipes WHERE recipe_id='${recipe_id}'`,
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
  selectAllRecipes,
  selectRecipesDetail,
  insertRecipes,
  updateRecipes,
  deleteRecipes,
  countData,
  findID,
};
