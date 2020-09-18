

const app = require("./app");
const { connectDB } = require("./database/database");

app.listen(process.env.PORT || 5000, async () => {
  console.log("It's running birch!");
  await connectDB();
});
