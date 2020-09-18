const productModel = require('../models/product.model')

module.exports = {
  getProducts: async (req, res) => {
    try {
      const result = await productModel.getProducts()
      res.status(200).json({
        message: true,
        data: result
      })

    } catch (err) {
      res.status(400).json('Something went wrong')
    }
  },
  getProduct: async (req, res) => {
    let { id } = req.params;
    if (id) {
      try {
        const result = await productModel.getProduct(id)
        res.status(200).json({
          message: true,
          data: result
        })

      } catch (err) {
        console.log(err)
        res.status(400).json('Something went wrong')
      }
    } else {
      res.status(400).json(`${id} not found`)

    }

  },
  createProduct: async (req, res) => {
    if (req.body) {
      try {
        const result = await productModel.createProduct(req.body)
        res.status(200).json({
          message: 'Product Created',
          data: result
        })
      } catch (err) {
        console.log(err)
        res.status(400).json(err)
      }
    } else {
      res.status(400).json('Invalid request')
    }
  }

}