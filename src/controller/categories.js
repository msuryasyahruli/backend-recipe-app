const commonHelper = require("../helper/common");
const {
  selectCategories,
  insertCategories,
  updateCategories,
  deleteCategories,
  findID,
} = require("../model/categories");
const { v4: uuidv4 } = require("uuid");

const categoriesController = {
  // get data
  getSelectCategories: async (req, res) => {
    selectCategories()
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Get Data Success")
      )
      .catch((err) => res.send(err));
  },

  // create data
  insertCategories: async (req, res) => {
    const { category_name } = req.body;
    const category_id = uuidv4();
    const data = {
      category_id,
      category_name,
    };
    insertCategories(data)
      .then(() =>
        commonHelper.response(res, data, 201, "Category Created")
      )
      .catch((err) => res.send(err));
  },

  // update data
  updateCategories: async (req, res) => {
    try {
      const category_id = String(req.params.id);
      const { category_name } = req.body;
      const { rowCount } = await findID(category_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        category_id,
        category_name,
      };
      updateCategories(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Update Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // delete data
  deleteCategories: async (req, res, next) => {
    try {
      const category_id = String(req.params.id);
      const { rowCount } = await findID(category_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteCategories(category_id)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Delete Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoriesController;
