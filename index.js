const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const userRouter = require("./routers/user");
const bookRouter = require("./routers/book");

app.use("/", userRouter);
app.use("/", bookRouter);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/bookApp";

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Book List API is working" });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});

// title:String,
// isbn:String,
// author:String,
// description:String,
// publisher:String,
// publishedDate:String,
// {
//   "title" :" Harry porter"
//   "isbn": "sjhwe",
//   "author": "avafawr",
//   "descriptions": "book",
//   "publisher":"abcpub",
//   "publishedDate":"20-11-2022"
// }
