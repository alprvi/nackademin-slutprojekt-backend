const productModel = require('../models/product.model')
const { product } = require('../data/products')

for (let i = 0; i < product.length; i++) {
  productModel.createProduct(product[i])
}