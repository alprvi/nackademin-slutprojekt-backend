const app = require("./app");

app.listen(process.env.PORT || 5000, async () => {
  console.log("It's running birch!");
  await connectDB();
});
