const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    default: "customer",
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next();
  }
});

const User = mongoose.model("user", userSchema);

const userModel = {
  async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return { loggedIn: false, message: "Invalid Password or Email" };

      // decode hashed Password
      const passwordIsCorrect = await bcrypt.compare(password, user.password);
      if (!passwordIsCorrect)
        return {
          loggedIn: false,
          message: "Invalid Password or Email",
        };

      // Create token
      const token = await userModel.generateAuthToken(user);
      return {
        loggedIn: true,
        token,
        user,
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async registerUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async updateUser(id, payload) {
    try {
      return await User.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async deleteUser(id) {
    try {
      return await User.deleteOne({ _id: id });
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async getUsers() {
    try {
      return await User.find();
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async getUser(id) {
    try {
      return await User.findOne({ _id: id });
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async generateAuthToken(user) {
    return jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET
    );
  },
};

module.exports = { User, userModel };
