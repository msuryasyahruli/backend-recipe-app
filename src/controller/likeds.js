const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const {
  selectLikeds,
  insertLikeds,
  deleteLikeds,
  findID,
  findRecipeID,
  findUserID,
} = require("../model/likeds");

const likedsController = {
  // get data
  getSelectLikeds: async (req, res) => {
    const user_id = String(req.params.id);
    selectLikeds(user_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Get Data Success")
      )
      .catch((err) => res.send(err));
  },

  // add data
  insertLikeds: async (req, res) => {
    const { recipe_id, user_id } = req.body;
    const { rowCount: recipeId } = await findRecipeID(recipe_id);
    const { rowCount: userId } = await findUserID(user_id);
    if (recipeId && userId) {
      return res.json({ message: "Already Liked" });
    };
    const liked_id = uuidv4();
    const data = {
      liked_id,
      recipe_id,
      user_id,
    };
    insertLikeds(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Liked")
      )
      .catch((err) => res.send(err));
  },

  // delete data
  deleteLikeds: async (req, res, next) => {
    try {
      const liked_id = String(req.params.id);
      const { rowCount } = await findID(liked_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteLikeds(liked_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Disliked")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = likedsController;
