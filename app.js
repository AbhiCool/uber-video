const { config } = require("dotenv");
config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/db");

const userRoutes = require("./routes/user.route");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);

app.use(errorHandler);

module.exports = app;
