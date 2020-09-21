const orderController = require('../controllers/order.controller')
const auth = require("../middlewares/authorization")

const express = require('express');
const router = express.Router();

router.get('/', auth.auth, orderController.getOrders);
router.post('/', auth.auth, orderController.createOrder);

module.exports = router;