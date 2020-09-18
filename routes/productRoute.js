const productController = require('../controllers/product.controller')

const express = require('express');
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);


module.exports = router;