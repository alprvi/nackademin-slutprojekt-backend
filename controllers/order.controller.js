const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
require("dotenv").config();

module.exports = {
  createOrder: async (req, res) => {
    let order;
    const total = await productModel.getTotalPrice(req.body.items);
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      order = {
        items: req.body.items,
        orderValue: total,
        userId: req.user.userId,
        customer: req.body.customer,
        payment: req.body.payment,
      };
    } else {
      if(req.body.customer.name && req.body.customer.city && req.body.customer.street && req.body.customer.zip ){
        order = {
          items: req.body.items,
          orderValue: total,
          customer: req.body.customer,
          payment: req.body.payment,
        };
        if (req.body) {
          try {
            const orderCreated = await orderModel.createOrder(order);
            if (orderCreated) {
              // Push to orderHistory array
              if (req.user) {
                await userModel.updateUser(req.user.userId, {
                  $push: {
                    orderHistory: orderCreated._id,
                  },
                });
              }
              res.status(200).json(orderCreated);
            }
          } catch (err) {
            console.log(err);
            res.status(400).json(err);
          }
        } else {
          res.status(400).json("Invalid request");
        } 
      }else{
      res.status(400).json("Invalid request, name city street & zip is required");
    }
  }
  },
  getOrders: async (req, res) => {
    let order;
    try {
      if (req.user.role == "admin") {
        order = await orderModel.getOrdersAdmin();
      } else {
        // order = await orderModel.getOrdersUser(req.user.userId);
        // console.log(order);
        const user = await userModel.getUser(req.user.userId);
        // check if user has orders
        if (user.orderHistory.length !== 0) {
          orderArray = user.orderHistory;
          order = await orderModel.getOrders(orderArray);
        } else {
          order = "";
        }
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json("Something went wrong");
    }
  },
};
