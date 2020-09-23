const mongoose = require("mongoose");

const schema = {
  status: {
    type: String,
  },
  items: {
    type: Array,
  },
  orderValue: {
    type: Number,
  },
  payment: {
    cardCVV: {
      type: String,
    },
    cardNr: {
      type: String,
    },
    cardOwner: {
      type: String,
    },
    cardValidUntil: {
      type: String,
    },
  },
  customer: {
    city: {
      type: String,
    },
    name: {
      type: String,
    },
    street: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  userId: {
    type: String,
    default: "anonym",
  },
};

const orderSchema = new mongoose.Schema(schema, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

module.exports = {
  Order,
  createOrder: (order) => {
    return new Promise((resolve, reject) => {
      Order.create(order, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  },
  getOrdersAdmin: () => {
    return new Promise((resolve, reject) => {
      Order.find({}, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  },
  getOrdersUser: (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
      Order.find({ userId: id }, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  },
  async getOrders(arrayOfOrders) {
    let result = [];
    try {
      for (orderId of arrayOfOrders) {
        const order = await Order.find({ _id: orderId.toString() }).exec();
        result.push(order[0]);
      }
      return result;
    } catch (error) {
      console.log(error);
      return result;
    }
  },
};
