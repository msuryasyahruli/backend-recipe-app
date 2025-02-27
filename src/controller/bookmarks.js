const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const {
  selectBookmarks,
  insertBookmarks,
  deleteBookmarks,
  findID,
  findBookmark,
} = require("../model/bookmarks");
const { findID: findUserID } = require("../model/users");

const bookmarksController = {
  // get data
  selectBookmarks: async (req, res) => {
    try {
      const user_id = String(req.params.id);

      const { rowCount: userExists } = await findUserID(user_id);
      if (!userExists) {
        return res.json({ message: "User Not Found" });
      }

      const result = await selectBookmarks(user_id);
      commonHelper.response(res, result.rows, 200, "Get Data Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // post data
  insertBookmarks: async (req, res) => {
    try {
      const { recipe_id, user_id } = req.body;
      const { rowCount: bookmarkExists } = await findBookmark(
        recipe_id,
        user_id
      );

      if (bookmarkExists) {
        return res.json({ message: "Already Bookmarked" });
      }

      const bookmark_id = uuidv4();
      const data = { bookmark_id, recipe_id, user_id };

      const result = await insertBookmarks(data);
      commonHelper.response(res, result.rows, 201, "Bookmarked");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // delete data
  deleteBookmarks: async (req, res) => {
    try {
      const bookmark_id = String(req.params.id);
      const { rowCount: likeIdExists } = await findID(bookmark_id);

      if (!likeIdExists) {
        return res.json({ message: "ID Not Found" });
      }

      const result = await deleteBookmarks(bookmark_id);
      commonHelper.response(res, result.rows, 200, "Unbookmarked");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};

module.exports = bookmarksController;
