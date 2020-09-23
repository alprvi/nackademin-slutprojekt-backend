const { userModel } = require("../models/user.model");

const userController = {
  async authenticateUser(req, res) {
    const result = await userModel.authenticateUser(
      req.body.email,
      req.body.password
    );
    if (!result.loggedIn) res.status(403).send(result.message);
    res.status(200).send({
      token: result.token,
      user: result.user,
    });
  },
  async registerUser(req, res) {
    let emailIsAlreadyRegistered = await userModel.getUserByEmail(
      req.body.email
    );
    if (emailIsAlreadyRegistered)
      return res.status(404).send("Email already registered");

    let userCreated = await userModel.registerUser(req.body);
    if (!userCreated) return res.sendStatus(500);
    let result = await userModel.authenticateUser(
      req.body.email,
      req.body.password
    );
    if (!result.loggedIn) res.status(403).send(result.message);
    res.status(201).send({
      token: result.token,
      user: result.user,
    });
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
