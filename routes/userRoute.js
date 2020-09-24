const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

userRouter.route("/").get(userController.getUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
// test
