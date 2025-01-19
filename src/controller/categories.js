const createError = require("http-errors");
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
  getCategories: async (req, res) => {
    try {
      const result = await selectCategories();
      commonHelper.response(res, result.rows, 200, "Get Data Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // create data
  insertCategories: async (req, res, next) => {
    try {
      const { error } = categorySchema.validate(req.body);
      if (error) {
        return next(createError(400, error.details[0].message));
      }

      const { category_name } = req.body;
      const category_id = uuidv4();
      const data = {
        category_id,
        category_name,
      };

      await insertCategories(data);
      commonHelper.response(res, data, 201, "Category created");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // update data
  updateCategories: async (req, res, next) => {
    try {
      const category_id = String(req.params.id);
      
      const { category_name } = req.body;
      const { rowCount } = await findID(category_id);
      if (!rowCount) {
        return next(createError(404, "Category is not found"));
      }

      const data = {
        category_id,
        category_name,
      };

      await updateCategories(data);
      commonHelper.response(res, result.rows, 200, "Category updated");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // delete data
  deleteCategories: async (req, res, next) => {
    try {
      const category_id = String(req.params.id);

      const { rowCount } = await findID(category_id);
      if (!rowCount) {
        return next(createError(404, "Category is not found"));
      }

      await deleteCategories(category_id);
      commonHelper.response(res, result.rows, 200, "Category deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};

module.exports = categoriesController;
