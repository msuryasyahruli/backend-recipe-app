const express = require("express");
const router = express.Router();
const likedsController = require("../controller/likeds");
router
  .get("/:id", likedsController.getSelectLikeds)
  .post("/", likedsController.insertLikeds)
  .delete("/:id", likedsController.deleteLikeds);
module.exports = router;
