require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = `mongodb+srv://${DBHOST}:${DBPASSOWRD}@cluster0.rv20u.mongodb.net/WebShopp?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
  } catch (error) {
    console.error(`It went wrong: ${error}`);
  }
};

module.exports = { connectDB };
