const express = require("express");
const router = express.Router();
const likesController = require("../controller/likes");
router
  .get("/:id", likesController.selectLikes)
  .post("/", likesController.insertLikes)
  .delete("/:id", likesController.deleteLikes);
module.exports = router;
