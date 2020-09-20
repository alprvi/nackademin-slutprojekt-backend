const app = require("./app");
const { connectDB } = require("./database/database");

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`It's running birch!: localhost:${port}`);
  await connectDB();
});
