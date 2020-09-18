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
};

const orderSchema = new mongoose.Schema(schema, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
