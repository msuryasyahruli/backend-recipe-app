const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const {
  selectBookmarks,
  insertBookmarks,
  deleteBookmarks,
  findRecipeID,
  findUserID,
  findID,
} = require("../model/bookmarks");

const bookmarksController = {
  getSelectBookmarks: async (req, res) => {
    const user_id = String(req.params.id);
    selectBookmarks(user_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Get Data Success")
      )
      .catch((err) => res.send(err));
  },

  insertBookmarks: async (req, res) => {
    let { recipe_id, user_id } = req.body;
    const { rowCount: recipeId } = await findRecipeID(recipe_id);
    const { rowCount: userId } = await findUserID(user_id);
    if (recipeId && userId) {
      return res.json({ message: "Already Bookmarked" });
    };
    const bookmark_id = uuidv4();
    const data = {
      bookmark_id,
      recipe_id,
      user_id,
    };
    insertBookmarks(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Bookmarked")
      )
      .catch((err) => res.send(err));
  },

  deleteBookmarks: async (req, res, next) => {
    try {
      const bookmark_id = String(req.params.id);
      const { rowCount } = await findID(bookmark_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteBookmarks(bookmark_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Unbookmarked")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = bookmarksController;
