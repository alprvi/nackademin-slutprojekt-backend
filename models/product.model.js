const mongoose = require("mongoose");

const schema = {
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
    required: true,
  },
  imgFile: {
    type: String,
  },
  category: {
    type: String,
  },
};

const productSchema = new mongoose.Schema(schema, { timestamps: true });

const Product = mongoose.model("product", productSchema);

module.exports = {
  Product,
  createProduct: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      Product.create(data, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  },
  getProducts: () => {
    return new Promise((resolve, reject) => {
      Product.find({}, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  },
  getProduct: (id) => {
    return new Promise((resolve, reject) => {
      Product.findOne({ _id: id }, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  },
  updateProduct: (productUpdated, id) => {
    console.log(productUpdated)
    return Product.findByIdAndUpdate(id, productUpdated, {
      new: true,
      runValidators: true
    })
  },
  deleteProduct: (id) => {
    return Product.remove({ _id: id })
  }
};
