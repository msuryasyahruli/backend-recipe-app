const Pool = require("../config/db");

// SELECT Categories
const selectCategories = () => {
  return Pool.query(
    `SELECT * FROM categories`
  );
};

// INSERT Categories
const insertCategories = (data) => {
  const { category_id, category_name } = data;
  return Pool.query(
    `INSERT INTO categories (category_id, category_name) 
    VALUES('${category_id}', '${category_name}')`
  );
};

// UPDATE Categories
const updateCategories = (data) => {
  const { category_id, category_name } = data;
  return Pool.query(
    `UPDATE categories SET category_name='${category_name}' WHERE category_id='${category_id}'`
  );
};

// DELETE Categories
const deleteCategories = (category_id) => {
  return Pool.query(`DELETE FROM categories WHERE category_id='${category_id}'`);
};

// FINDID
const findID = (category_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT category_id FROM categories WHERE category_id='${category_id}'`,
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
  selectCategories,
  insertCategories,
  updateCategories,
  deleteCategories,
  findID,
};
