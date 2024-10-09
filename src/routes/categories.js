const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categories");
router
  .get("/", categoriesController.getSelectCategories)
  .post("/", categoriesController.insertCategories)
  .put("/:id", categoriesController.updateCategories)
  .delete("/:id", categoriesController.deleteCategories);
module.exports = router;
