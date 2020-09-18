require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = `mongodb+srv://${process.env.DBHOST}:${process.env.DBPASSWORD}@cluster0.rv20u.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
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

mongoose.connection.once("open", function () {
  console.log(`MongoDB is ready`);
});

async function disconnect () {
  await mongoose.connection.close()
}

module.exports = { connectDB,disconnect };
