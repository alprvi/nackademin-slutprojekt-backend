const productController = require('../controllers/product.controller')
const auth = require("../middlewares/authorization")

const express = require('express');
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', auth.auth, auth.admin, productController.createProduct);
router.patch('/:id', auth.auth, auth.admin, productController.updateProduct);
router.delete('/:id', auth.auth, auth.admin, productController.deleteProduct);


module.exports = router;