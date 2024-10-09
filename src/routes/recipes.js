const express = require("express");
const router = express.Router();
const uploadRecipes = require("../middlewares/uploadRecipes");
const recipesController = require("../controller/recipes");

router
  .get("/", recipesController.getAllRecipes)
  .get("/:id", recipesController.getRecipesDetail)
  .post("/", uploadRecipes, recipesController.insertRecipes)
  .patch("/:id", uploadRecipes, recipesController.updateRecipes)
  .delete("/:id", recipesController.deleteRecipe)

module.exports = router;
