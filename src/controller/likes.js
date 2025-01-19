const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const {
  selectLikes,
  insertLikes,
  deleteLikes,
  findID,
  findLike,
} = require("../model/likes");
const { findID: findUserID } = require("../model/users");

const likesController = {
  // get data
  selectLikes: async (req, res) => {
    try {
      const user_id = String(req.params.id);

      const { rowCount: userExists } = await findUserID(user_id);
      if (!userExists) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const result = await selectLikes(user_id);
      commonHelper.response(res, result.rows, 200, "Get Data Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // post data
  insertLikes: async (req, res) => {
    try {
      const { recipe_id, user_id } = req.body;
      const { rowCount: likeExists } = await findLike(recipe_id, user_id);

      if (likeExists) {
        return res.status(409).json({ message: "Already Liked" });
      }

      const like_id = uuidv4();
      const data = { like_id, recipe_id, user_id };

      const result = await insertLikes(data);
      commonHelper.response(res, result.rows, 201, "Liked");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // delete data
  deleteLikes: async (req, res) => {
    try {
      const like_id = String(req.params.id);
      const { rowCount: likeIdExists } = await findID(like_id);

      if (!likeIdExists) {
        return res.status(404).json({ message: "ID Not Found" });
      }

      const result = await deleteLikes(like_id);
      commonHelper.response(res, result.rows, 200, "Disliked");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};

module.exports = likesController;
