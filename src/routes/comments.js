const express = require("express");
const router = express.Router();
const commentsController = require("../controller/comments");
router
  .get("/:id", commentsController.getComments )
  .post("/", commentsController.insertComments )
  .put("/:id", commentsController.updateComments )
  .delete("/:id", commentsController.deleteComments );
module.exports = router;
