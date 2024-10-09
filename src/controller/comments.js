const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const {
  selectComments,
  insertComments,
  updateComments,
  deleteComments,
  findID,
} = require("../model/comments");

const commentsController = {
  // get data
  getSelectComments: async (req, res) => {
    const recipe_id = String(req.params.id);

    selectComments(recipe_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Get Data Success")
      )
      .catch((err) => res.send(err));
  },

  // create data
  insertcomments: async (req, res) => {
    const { recipe_id, user_id, comment_text } = req.body;
    const comment_id = uuidv4();
    const data = {
      comment_id,
      recipe_id,
      user_id,
      comment_text,
    };
    insertComments(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Add Comment Success")
      )
      .catch((err) => res.send(err));
  },

  // update data
  updateComments: async (req, res) => {
    try {
      const { comment_text } = req.body;
      const comment_id = String(req.params.id);
      const { rowCount } = await findID(comment_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        comment_id,
        comment_text,
      };
      updateComments(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Comment Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // delete data
  deleteComments: async (req, res, next) => {
    try {
      const comment_id = String(req.params.id);
      const { rowCount } = await findID(comment_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteComments(comment_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Comment Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = commentsController;
