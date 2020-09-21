const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const orderRouter = require("./orderRoute");
const userController = require("../controllers/user.controller");

router.post("/api/register", userController.registerUser);
router.post("/api/auth", userController.authenticateUser);

router.use("/api/users", userRouter);
router.use("/api/products", productRouter);
//router.use("/api/orders", orderRouter);

module.exports = router;
