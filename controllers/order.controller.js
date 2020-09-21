const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')

module.exports = {
  createOrder: async (req, res) => {
    const total = await productModel.getTotalPrice(req.body.items)
    if (req.body) {
      let order = {
        items: req.body.items,
        orderValue: total,
        userId: req.user.userId
      }
      try {
        const result = await orderModel.createOrder(order)
        res.status(200).json(result)
      } catch (err) {
        console.log(err)
        res.status(400).json(err)
      }
    } else {
      res.status(400).json('Invalid request')
    }
  },
  getOrders: async (req, res) => {
    let order
    try {
      if (req.user.role == 'admin') {
        order = await orderModel.getOrdersAdmin()
      } else {
        order = await orderModel.getOrdersUser(req.user.userId)
      }
      res.status(200).json(order)

    } catch (err) {
      res.status(400).json('Something went wrong')
    }
  }
}