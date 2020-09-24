var expect = require("chai").expect;
var should = require("chai").should();
const order = require("../../models/order.model");
const { userModel, User } = require("../../models/user.model");
const product = require("../../models/product.model");
const Database = require("../../database/database");

describe("Product order", () => {
  before(async () => {
    await Database.connectDB();
  });

  after(async () => {
    await Database.disconnectDB();
  });

  beforeEach(async function () {
    // await product.Product.deleteMany();
    // await order.Order.deleteMany();
    // await User.deleteMany();
    await Database.clearDatabase();

    const createOrder = {
      items: ["5f688a75de5f9538a8575958", "5f688a75de5f9538a857595e"],
      orderValue: 100,
      customer: {
        zip: 123456,
        street: "test_street",
        name: "test_name",
        city: "test_city",
      },
      payment: {},
    };
    const createUser = {
      email: "test_email@email.com",
      role: "admin",
      password: "test_password",
      name: "test_name",
      adress: { street: "test_street", zip: 123456, city: "test_city" },
    };

    this.resultUser = await userModel.registerUser(createUser);
    this.resultOrder = await order.createOrder(createOrder);
    this.resultAuth = await userModel.authenticateUser(
      createUser.email,
      createUser.password
    );
  });
  it("should create a order", async () => {
    let createOrder = {
      items: ["5f688a75de5f9538a8575958", "5f688a75de5f9538a857595e"],
      orderValue: 100,
      customer: {
        zip: 123456,
        street: "test_street",
        name: "test_name",
        city: "test_city",
      },
      payment: {},
    };

    const orderResult = await order.createOrder(createOrder);
    orderResult.should.have.property("customer");
  });
  it("should get orders as admin", async function () {
    const orderResult = await order.getOrdersAdmin();
    //orderResult.should.have.property("userId").equal("5f688aa2ea600b0dac2970c4");
  });
});