const Pool = require("../config/db");

// GET ALL RECIPES
const selectAllRecipes = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT recipes.recipe_id, recipes.recipe_title, users.user_name as recipe_by, recipes.recipe_ingredients, recipes.recipe_thumbnail, recipes.recipe_video, categories.category_name, recipes.created_at
  FROM recipes
  LEFT JOIN users ON recipes.user_id = users.user_id
  LEFT JOIN categories ON recipes.category_id = categories.category_id
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

// SELECT DETAIL RECIPES
const selectDetailRecipes = (recipe_id) => {
  return Pool.query(`
  SELECT recipes.recipe_id, recipes.recipe_title, users.user_name as recipe_by, recipes.recipe_ingredients, recipes.recipe_thumbnail, recipes.recipe_video, categories.category_name, recipes.created_at
  FROM recipes
  LEFT JOIN users ON recipes.user_id = users.user_id
  LEFT JOIN categories ON recipes.category_id = categories.category_id
  WHERE recipes.recipe_id='${recipe_id}'`);
};

// SELECT MY RECIPES
const selectMyRecipes = (user_id) => {
  return Pool.query(`
  SELECT recipes.recipe_id, recipes.recipe_title, users.user_name as recipe_by, recipes.recipe_thumbnail, categories.category_name, recipes.created_at
  FROM recipes
  LEFT JOIN users ON recipes.user_id = users.user_id
  LEFT JOIN categories ON recipes.category_id = categories.category_id
  WHERE recipes.user_id ILIKE '%${user_id}%'`);
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
      `SELECT recipe_id, recipe_title FROM recipes WHERE recipe_id='${recipe_id}'`,
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

// SEARCHING
const searching = (name) => {
  return Pool.query(`SELECT * FROM recipes WHERE recipe_title ILIKE '%${name}%'`);
};

module.exports = {
  selectAllRecipes,
  selectDetailRecipes,
  selectMyRecipes,
  insertRecipes,
  updateRecipes,
  deleteRecipes,
  countData,
  findID,
  searching,
};
