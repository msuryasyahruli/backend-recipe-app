const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const recipesRouter = require("./recipes");
const categoriesRouter = require("./categories");
const commentsRouter = require("./comments");
const likesRouter = require("./likes");
const bookmarksRouter = require("./bookmarks");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/recipes", recipesRouter);
router.use("/comments", commentsRouter);
router.use("/likes", likesRouter);
router.use("/bookmarks", bookmarksRouter);
module.exports = router;
