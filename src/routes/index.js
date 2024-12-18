const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipes");
const categoriesRouter = require("../routes/categories");
const commentsRouter = require("../routes/comments");
const likedsRouter = require("../routes/likeds");
const bookamrksRouter = require("../routes/bookmarks");

router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/recipes", recipesRouter);
router.use("/comments", commentsRouter);
router.use("/likeds", likedsRouter);
router.use("/bookmarks", bookamrksRouter);
module.exports = router;
