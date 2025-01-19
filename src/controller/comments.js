const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const {
  selectComments,
  insertComments,
  updateComments,
  deleteComments,
  findID,
} = require("../model/comments");
const { findID: findRecipeID } = require("../model/recipes");
const schema = require("./validationSchema");
const createError = require("http-errors");

const commentsController = {
  // get data
  getComments: async (req, res) => {
    try {
      const recipe_id = String(req.params.id);

      const { rowCount: recipeExists } = await findRecipeID(recipe_id);
      if (!recipeExists) {
        return res.status(404).json({ message: "Recipe Not Found" });
      }

      const result = await selectComments(recipe_id);
      commonHelper.response(res, result.rows, 200, "Get Data Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // create data
  insertComments: async (req, res, next) => {
    try {
      const { error } = schema.commentSchema.validate(req.body);
      if (error) {
        return next(createError(400, error.details[0].message));
      }

      const { recipe_id, user_id, comment_text } = req.body;
      const comment_id = uuidv4();

      const { rowCount: recipeExists } = await findRecipeID(recipe_id);
      if (!recipeExists) {
        return res.status(404).json({ message: "Recipe Not Found" });
      }

      const data = {
        comment_id,
        recipe_id,
        user_id,
        comment_text,
      };

      const result = await insertComments(data);

      commonHelper.response(res, result.rows, 201, "Comment Added");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // update data
  updateComments: async (req, res, next) => {
    try {
      const comment_id = String(req.params.id);

      const { rowCount } = await findID(comment_id);
      if (!rowCount) {
        return next(createError(404, "Comment ID Not Found"));
      }

      const { error } = schema.updateCommentSchema.validate(req.body);
      if (error) {
        return next(createError(400, error.details[0].message));
      }

      const { comment_text } = req.body;

      const data = {
        comment_id,
        comment_text,
      };

      await updateComments(data);

      commonHelper.response(res, [], 200, "Comment Updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // delete data
  deleteComments: async (req, res) => {
    try {
      const comment_id = String(req.params.id);
      const { rowCount } = await findID(comment_id);

      if (!rowCount) {
        return res.status(404).json({ message: "ID Not Found" });
      }

      const result = await deleteComments(comment_id);
      commonHelper.response(res, result.rows, 200, "Comment Deleted");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};

module.exports = commentsController;
