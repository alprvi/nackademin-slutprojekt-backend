require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const { userModel, User } = require("../../models/user.model");
const app = require("../../app");
const orderModel = require("../../models/order.model");
const productModel = require("../../models/product.model");

/*const {
    connectDB,
    disconnectDB,
    clearDatabase,
} = require("../../database/database");*/
const database = require("../../database/database");


chai.should();
chai.use(chaiHttp);

describe("Testing integration for ORDERS", function () {
    before(async function () {
        await database.connectDB();
    });

    beforeEach(async function () {
        await database.clearDatabase()

        //create new 2 products
        let newproduct1 = {
            title: "Wave",
            price: 249,
            shortDesc: "Medium",
            longDesc:
                "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
            imgFile: "wheel-wave.png",
        }
        let newproduct2 = {
            title: "Spinner",
            price: 249,
            shortDesc: "Soft",
            category: "wheels",
            longDesc:
                "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
            imgFile: "wheel-spinner.png",
        }


        const result1 = await productModel.createProduct(newproduct1)
        const result2 = await productModel.createProduct(newproduct2)

        this.currentTest.productId1 = result1._id
        this.currentTest.productId2 = result2._id
        this.currentTest.price = result1.price
        this.currentTest.price = result2.price

        //register new test USER
        await userModel.registerUser({
            email: "test_email@email.com",
            password: "test_password",
            name: "test_name",
            adress: { street: "test_street", zip: 123456, city: "test_city" },
        });
        //register new test Admin
        await userModel.registerUser({
            email: "test_admin@email.com",
            password: "test_admin",
            name: "test_admin",
            role: "admin",
            adress: { street: "test_street", zip: 123456, city: "test_city" },
        });
        //auth user
        const authUser = await userModel.authenticateUser(
            "test_email@email.com",
            "test_password"
        );
        //auth admin
        const authAdmin = await userModel.authenticateUser(
            "test_admin@email.com",
            "test_admin"
        );

        //user token 
        this.currentTest.userToken = authUser.token;
        //admin token
        this.currentTest.adminToken = authAdmin.token;

    });

    after(async function () {
        await database.disconnectDB();
    });
    describe("/api/order POST", function () {
        it("a USER should create a new order", function (done) {
            const fields = {
                items: [this.test.productId1, this.test.productId2],
                customer: {
                    zip: 123456,
                    street: "test_street",

                    name: "test_name",
                    city: "test_city",
                },
                payment: {},
            };
            chai
                .request(app)
                .post("/api/orders")
                .set("Authorization", `Bearer ${this.test.userToken}`)
                .set("Content-Type", "application/json")
                .send(fields)
                .end((err, res) => {
                    // chai.expect(err).to.be.null;
                    chai.expect(res).to.have.status(200);
                    chai.expect(res).to.be.json;
                    chai.expect(res.body.orderValue).to.equal(498)
                    done()
                });
        });
        it("An ADMIN should create a new order", function (done) {
            const createOrder = {
                items: [this.test.productId1],
                customer: {
                    zip: 123456,
                    street: "test_street",
                    name: "test_name",
                    city: "test_city",
                },
                payment: {},
            };
            chai
                .request(app)
                .post("/api/orders")
                .set("Authorization", `Bearer ${this.test.adminToken}`)
                .set("Content-Type", "application/json")
                .send(createOrder)
                .end((err, res) => {
                    // chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200);
                    chai.expect(res).to.be.json;
                    done()
                });
        });
    });
    describe("/api/orders GET", function () {

        it("Should get all order for Admin", async function () {
           const order1 = {
                items: [this.test.productId1, this.test.productId2],
                customer: {
                    zip: 123456,
                    street: "test_street",

                    name: "test_name",
                    city: "test_city",
                },
                payment: {},
            }
            const order2 = {
                items: [this.test.productId1],
                customer: {
                    zip: 123456,
                    street: "test_street",

                    name: "test_name",
                    city: "test_city",
                },
                payment: {},
            }
            const res = await chai.request(app)
            .post("/api/orders")
            .set("Authorization", `Bearer ${this.test.userToken}`)
            .set("Content-Type", "application/json")
            .send(order1)

            const res2 = await chai.request(app)
            .post("/api/orders")
            .set("Authorization", `Bearer ${this.test.adminToken}`)
            .set("Content-Type", "application/json")
            .send(order2)

            const res3 = await chai
                .request(app)
                .get("/api/orders")
                .set("Authorization", `Bearer ${this.test.adminToken}`)
                .set("Content-Type", "application/json")
                console.log(res3.body)
                chai.expect(res3).to.have.status(200);
                chai.expect(res3).to.be.json;

        }); 

       it("Should get an order for user", async function () {
            const order1 = {
                items: [this.test.productId1, this.test.productId2],
                customer: {
                    zip: 123456,
                    street: "test_street",

                    name: "test_name",
                    city: "test_city",
                },
                payment: {},
            }
            const order2 = {
                items: [this.test.productId1],
                customer: {
                    zip: 123456,
                    street: "test_street",

                    name: "test_name",
                    city: "test_city",
                },
                payment: {},
            }
            const res = await chai.request(app)
            .post("/api/orders")
            .set("Authorization", `Bearer ${this.test.userToken}`)
            .set("Content-Type", "application/json")
            .send(order1)

            const res3 = await chai.request(app)
            .post("/api/orders")
            .set("Authorization", `Bearer ${this.test.adminToken}`)
            .set("Content-Type", "application/json")
            .send(order2)
         
            const res2 = await chai
                .request(app)
                .get("/api/orders")
                .set("Authorization", `Bearer ${this.test.userToken}`)
                .set("Content-Type", "application/json")
              
                chai.expect(res2).to.have.status(200);
                chai.expect(res2).to.be.json;
                res2.body.forEach(res => chai.expect(res).to.have.any.keys('customer', 'status'))
        });
    }) 
});

