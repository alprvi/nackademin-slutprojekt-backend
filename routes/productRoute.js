const productController = require('../controllers/product.controller')
const auth = require("../middlewares/authorization")

const express = require('express');
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.patch('/:id', auth.auth, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;