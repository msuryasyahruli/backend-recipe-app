const express = require("express");
const router = express.Router();
const bookmarksController = require("../controller/bookmarks");
router
  .get("/:id", bookmarksController.getSelectBookmarks)
  .post("/", bookmarksController.insertBookmarks)
  .delete("/:id", bookmarksController.deleteBookmarks);
module.exports = router;
