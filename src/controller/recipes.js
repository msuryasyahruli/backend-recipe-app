const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const Joi = require("joi");
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllRecipes,
  selectDetailRecipes,
  insertRecipes,
  updateRecipes,
  deleteRecipes,
  countData,
  findID,
  selectMyRecipes,
} = require("../model/recipes");

const recipesController = {
  // get all
  getAllRecipes: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "created_at";
      const sort = req.query.sort || "desc";
      const search = req.query.search || "";
      const result = await selectAllRecipes({ limit, offset, sort, sortby, search });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "Get Data Success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  // get detail
  getDetailRecipes: async (req, res, next) => {
    const recipe_id = String(req.params.id);
    const { rowCount } = await findID(recipe_id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    selectDetailRecipes(recipe_id)
      .then((result) =>
        commonHelper.response(res, result.rows[0], 200, "Get Data Success")
      )
      .catch((err) => res.send(err));
  },

  // get by user
  getMyRecipes: async (req, res) => {
    const user_id = String(req.params.id);
    selectMyRecipes(user_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Get Data Success")
      )
      .catch((err) => res.send(err));
  },

  // create
  insertRecipes: async (req, res) => {
    const { recipe_title, recipe_ingredients, user_id, recipe_video, category_id } =
      req.body;
    const recipe_id = uuidv4();
    let recipe_thumbnail = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      recipe_thumbnail = result.secure_url;
    }
    const data = {
      recipe_id,
      recipe_title,
      recipe_ingredients,
      recipe_thumbnail,
      recipe_video,
      category_id,
      user_id,
    };
    insertRecipes(data)
      .then(() =>
        commonHelper.response(res, data, 201, "Create Recipe Success")
      )
      .catch((err) => res.send(err));
  },

  // update
  updateRecipes: async (req, res) => {
    try {
      const { recipe_title, recipe_ingredients, recipe_video } = req.body;
      const recipe_id = String(req.params.id);
      const { rowCount } = await findID(recipe_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }

      let recipe_thumbnail = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        recipe_thumbnail = result.secure_url;
      }

      const data = {
        recipe_id,
        recipe_title,
        recipe_ingredients,
        recipe_thumbnail,
        recipe_video,
      };
      updateRecipes(data)
        .then(() =>
          commonHelper.response(res, data, 200, "Recipe Updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // delete
  deleteRecipe: async (req, res, next) => {
    try {
      const recipe_id = String(req.params.id);
      const { rowCount } = await findID(recipe_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deleteRecipes(recipe_id);
      commonHelper.response(res, {}, 200, "Recipe Deleted");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = recipesController;
