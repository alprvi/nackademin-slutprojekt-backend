const mongoose = require("mongoose");

const schema = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  adress: {
    street: {
      type: String,
    },
    zip: {
      type: Number,
    },
    city: {
      type: String,
    },
  },
  orderHistory: {
    type: Array,
  },
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = { User };
