const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
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
  searching,
} = require("../model/recipes");
const schema = require("./validationSchema");

const recipesController = {
  // get all
  getAllRecipes: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "created_at";
      const sort = req.query.sort || "desc";

      const result = await selectAllRecipes({ limit, offset, sort, sortby });
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

      const message =
        result.rowCount === 0 ? "Recipe not found" : "Get Data Success";

      commonHelper.response(res, result.rows, 200, message, pagination);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // get detail
  getDetailRecipes: async (req, res, next) => {
    try {
      const recipe_id = String(req.params.id);

      const { rowCount } = await findID(recipe_id);
      if (!rowCount) {
        return next(createError(404, "Recipe ID not found"));
      }

      const result = await selectDetailRecipes(recipe_id);

      commonHelper.response(res, result.rows[0], 200, "Get Data Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // get by user
  getMyRecipes: async (req, res, next) => {
    try {
      const user_id = String(req.params.id);
      const result = await selectMyRecipes(user_id);

      if (result.rowCount === 0) {
        return next(createError(404, "User ID is not found"));
      }

      commonHelper.response(res, result.rows, 200, "Get Data Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // create
  insertRecipes: async (req, res, next) => {
    try {
      const { error } = schema.recipeSchema.validate(req.body);
      if (error) {
        return next(createError(400, error.details[0].message));
      }

      const {
        recipe_title,
        recipe_ingredients,
        user_id,
        recipe_video,
        category_id,
      } = req.body;
      const recipe_id = uuidv4();

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Mama Recipe",
          public_id: recipe_id,
        });
        recipe_thumbnail = result.secure_url;
      } else {
        return next(createError(400, "Recipe thumbnail is required"));
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

      await insertRecipes(data);

      commonHelper.response(res, [], 201, "Recipe created");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // update
  updateRecipes: async (req, res, next) => {
    try {
      const { recipe_title, recipe_ingredients, recipe_video } = req.body;
      const recipe_id = String(req.params.id);

      const { rowCount } = await findID(recipe_id);
      if (!rowCount) {
        return next(createError(404, "Recipe ID not found"));
      }

      let recipe_thumbnail = null;
      if (req.file) {
        await cloudinary.uploader.destroy(
          "Mama Recipe/" + recipe_id,
          (error) => {
            if (error) {
              return next(
                createError(400, "Error deleting file from Cloudinary:")
              );
            }
          }
        );

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Mama Recipe",
          public_id: recipe_id,
        });
        recipe_thumbnail = result.secure_url;
      }

      const data = {
        recipe_id,
        recipe_title,
        recipe_ingredients,
        recipe_thumbnail,
        recipe_video,
      };

      await updateRecipes(data);

      commonHelper.response(res, [], 200, "Recipe updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // delete
  deleteRecipe: async (req, res, next) => {
    try {
      const recipe_id = String(req.params.id);

      const { rowCount } = await findID(recipe_id);
      if (!rowCount) {
        return next(createError(404, "Recipe ID is not found"));
      }

      await deleteRecipes(recipe_id);

      cloudinary.uploader.destroy("Mama Recipe/" + recipe_id, (error) => {
        if (error) {
          return next(createError(400, "Error deleting file from Cloudinary:"));
        }
      });

      commonHelper.response(res, [], 200, "Recipe Deleted");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // searching
  searching: async (req, res, next) => {
    try {
      const search = req.query.keyword;

      if (!search || search.trim() === "") {
        return next(createError(403, "Keywords should not be empty"));
      }

      const result = await searching(search);

      const message =
        result.rowCount === 0 ? "Recipe not found" : "Search success";

      commonHelper.response(res, result.rows, 200, message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};

module.exports = recipesController;
