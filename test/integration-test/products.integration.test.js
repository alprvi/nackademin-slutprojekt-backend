require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");

const {
  connectDB,
  disconnectDB,
  clearDatabase,
} = require("../../database/database");
const { userModel, User } = require("../../models/user.model");

const app = require("../../app");
const Product = require("../../models/product.model");

chai.should();
chai.use(chaiHttp);

describe("Testing Product INTEGRATION", function () {
  before(async function () {
    await connectDB();
  });

  beforeEach(async function () {
    await Product.Product.deleteMany();
    await User.deleteMany();
    await userModel.registerUser({
      email: "test_email@email.com",
      password: "test_password",
      name: "test_name",
      adress: { street: "test_street", zip: 123456, city: "test_city" },
    });

    await userModel.registerUser({
      email: "test_email_admin@email.com",
      password: "test_password",
      name: "test_name",
      role: "admin",
      adress: { street: "test_street", zip: 123456, city: "test_city" },
    });

    const authenticatedUser = await userModel.authenticateUser(
      "test_email@email.com",
      "test_password"
    );

    const authenticatedAdmin = await userModel.authenticateUser(
      "test_email_admin@email.com",
      "test_password"
    );

    this.currentTest.userToken = authenticatedUser.token;
    this.currentTest.adminToken = authenticatedAdmin.token;
  });

  after(async function () {
    await disconnectDB();
  });

  describe("/api/products POST", function () {
    it("should create a new product if user is admin", function () {
      const fields = {
        title: "perspiciatis provident aliquid",
        price: 799999,
        shortDesc: "Unisex",
        category: "board",
        longDesc:
          "Fugiat consectetur necessitatibus autem impedit eveniet itaque et.",
        imgFile: "skateboard-generic.png",
      };
      chai
        .request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${this.test.adminToken}`)
        .set("Content-Type", "application/json")
        .send(fields)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(201);
          res.should.be.json;
        });
    });
    it("should not create a new product if user is not admin", function () {
      const fields = {
        title: "perspiciatis provident aliquid",
        price: 799999,
        shortDesc: "Unisex",
        category: "board",
        longDesc:
          "Fugiat consectetur necessitatibus autem impedit eveniet itaque et.",
        imgFile: "skateboard-generic.png",
      };
      chai
        .request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${this.test.userToken}`)
        .set("Content-Type", "application/json")
        .send(fields)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(403);
        });
    });
  });

  describe("/api/products/:id PATCH", function () {
    it("should update a product if user is admin", async function () {
      const product = await Product.createProduct({
        title: "a product",
        price: 799999,
        shortDesc: "Unisex",
        category: "board",
        longDesc:
          "Fugiat consectetur necessitatibus autem impedit eveniet itaque et.",
        imgFile: "skateboard-generic.png",
      });
      const id = product._id.toString();

      const fields = {
        title: "updated name",
      };

      chai
        .request(app)
        .patch(`/api/products/${id}`)
        .set("Authorization", `Bearer ${this.test.adminToken}`)
        .set("Content-Type", "application/json")
        .send(fields)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.should.be.json;
          res.body.data.should.have.property("title");
          res.body.data.title.should.equal("updated name");
        });
    });
    it("should delete a product if user is admin", async function () {
      const productToDelete = await Product.createProduct({
        title: "some product",
        price: 799999,
        shortDesc: "Unisex",
        category: "board",
        longDesc:
          "Fugiat consectetur necessitatibus autem impedit eveniet itaque et.",
        imgFile: "skateboard-generic.png",
      });
      const id = productToDelete._id.toString();

      chai
        .request(app)
        .delete(`/api/products/${id}`)
        .set("Authorization", `Bearer ${this.test.adminToken}`)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.have.property("message");
        });
    });
  });
});
