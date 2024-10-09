const express = require("express");
const router = express.Router();
const uploadUsers = require("../middlewares/uploadUsers");
const usersController = require("../controller/users");
const { protect } = require("../middlewares/auth");
router
  .post("/register", usersController.registerUsers)
  .post("/login", usersController.loginUsers)
  .get("/profile", protect, usersController.profile)
  .patch("/:id", uploadUsers, usersController.updateUsers)
  .put("/:id/password", usersController.updatePasswordUsers)
  .delete("/:id", usersController.deleteUsers);
module.exports = router;
