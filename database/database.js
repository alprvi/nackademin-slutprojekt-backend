require("dotenv").config();
const mongoose = require("mongoose");

let connectDB, uri
switch ((process.env.ENVIRONMENT)) {
  case 'test':
    connectDB = async () => {
      uri = `mongodb://127.0.0.1:27017/Nackademin-slutprojekt-test`
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

      mongoose.connection.once("open", function () {
        console.log(`MongoDB Test is ready`);
      });
    };
    break;
  case 'development':
  case 'production':
  case 'staging':
    connectDB = async () => {
      uri = `mongodb+srv://${process.env.DBHOST}:${process.env.DBPASSWORD}@cluster0.rv20u.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
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

      mongoose.connection.once("open", function () {
        console.log(`MongoDB is ready`);
      });
    };
    break;

}


async function disconnect () {
  await mongoose.connection.close()
}

async function clearDatabase () {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

module.exports = { connectDB, disconnect, clearDatabase };
