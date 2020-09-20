require("dotenv").config();
const mongoose = require("mongoose");

process.env.ENVIRONMENT = process.env.ENVIRONMENT || "development";
let mongoDB;

switch (process.env.ENVIRONMENT) {
  case "development":
  case "dev":
  case "staging":
    mongoDB = {
      getUri: async () =>
        `mongodb+srv://${process.env.DBHOST}:${process.env.DBPASSWORD}@cluster0.rv20u.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    };
    break;
  case "test":
    const { MongoMemoryServer } = require("mongodb-memory-server");
    mongoDB = new MongoMemoryServer();
    break;
  default:
    throw new Error(`${process.env.ENVIRONMENT} is not a valid environment`);
}

const connectDB = async () => {
  const uri = await mongoDB.getUri();
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

const disconnectDB = async () => {
  try {
    await mongoose.connection.close(() => {
      console.log("Disconnected from MongoDB");
    });
    if (process.env.ENVIRONMENT === "test") {
      await mongoDB.stop();
    }
  } catch (error) {
    console.error(error);
  }
};

async function clearDatabase () {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

mongoose.connection.once("open", function () {
  console.log(`MongoDB ${process.env.ENVIRONMENT} is ready`);
});

module.exports = { connectDB, disconnectDB,clearDatabase };
