require("dotenv").config();
const chai = require("chai");

const { connectDB, disconnectDB } = require("../../database/database");
const { userModel, User } = require("../../models/user.model");

chai.should();

describe("Testing USER MODEL", function () {
  before(async function () {
    await connectDB();
  });

  beforeEach(async function () {
    await User.deleteMany();
  });

  after(async function () {
    await disconnectDB();
  });

  describe("/api/register POST", function () {
    it("should register a user", async function () {
      // Arrange
      const user = {
        email: "test_email@email.com",
        password: "test_password",
        name: "test_name",
        adress: { street: "test_street", zip: 123456, city: "test_city" },
      };
      // Act
      const result = await userModel.registerUser(user);
      // Assert
      result.should.be.an("object");
      result.should.have.property("_id");
      result.should.have.property("adress");
      result.should.have.property("email");
      result.should.have.property("name");
      result.should.have.property("password");
      result.should.have.property("role");
      result.should.have.property("createdAt");
      result.should.have.property("updatedAt");
      result.should.have.property("orderHistory");
    });
  });
  describe("api/auth POST", function () {
    it("should return loggedIn:true and a token when user login successfully", async function () {
      // Arrange
      const user = {
        email: "test_email@email.com",
        password: "test_password",
        name: "test_name",
        adress: { street: "test_street", zip: 123456, city: "test_city" },
      };
      await userModel.registerUser(user);

      // Act
      const result = await userModel.authenticateUser(
        user.email,
        user.password
      );

      // Assert
      result.should.be.an("object");
      result.should.have.property("loggedIn");
      result.loggedIn.should.be.true;
      result.should.have.property("token");
      result.token.should.be.a("string");
      result.should.have.property("user");
      result.user.should.be.an("object");
    });
    it("should return loggedIn:false when login with wrong email or password", async function () {
      // Arrange
      const user = {
        email: "test_email@email.com",
        password: "test_password",
        name: "test_name",
        adress: { street: "test_street", zip: 123456, city: "test_city" },
      };
      await userModel.registerUser(user);

      // Act
      const result = await userModel.authenticateUser(
        "test_fail_email@email.com",
        user.password
      );

      // Assert
      result.should.be.an("object");
      result.should.have.property("loggedIn");
      result.loggedIn.should.be.false;
      result.should.have.property("message");
      result.message.should.eq("Invalid Password or Email");
    });
  });
});
