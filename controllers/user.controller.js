const { userModel } = require("../models/user.model");

const userController = {
  async login(req, res) {
    const result = await userModel.login(req.body.email, req.body.password);
    console.log(result);
    if (!result.loggedIn) res.status(403).send(result.message);
    res.header("x-access-token", result.token).sendStatus(200);
  },
  async createUser(req, res) {
    // Check if user already exists HERE
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    let userCreated = await userModel.createUser(user);
    if (!userCreated) return res.sendStatus(500);
    res.sendStatus(201);
  },
  async updateUser(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("user not found");
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.sendStatus(500);
    res.status(200).send(updatedUser);
  },
  async deleteUser(req, res) {
    const user = await userModel.getUser(req.params.id);
    if (!user) return res.status(404).send("user not found");

    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) return res.sendStatus(500);
    res.status(200).send("user deleted");
  },
  async getUsers(req, res) {
    const users = await userModel.getUsers();
    if (!users) return res.status(404).send();
    res.status(200).send(users);
  },
  async getUser(req, res) {},
};

module.exports = userController;
