import * as mongoose from "mongoose";
import app from "./app";

const url = process.env.MONGODB_URI || "mongodb://localhost:27018/test_database";
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  await mongoose.connect(url, { useNewUrlParser: true });
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
