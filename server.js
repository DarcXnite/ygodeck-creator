require("dotenv").config();

const express = require("express");
const rowdy = require("rowdy-logger");
const cookieParser = require("cookie-parser");
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

// app config
const PORT = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");

// middlewares
const rowdyRes = rowdy.begin(app);
app.use(require("express-ejs-layouts"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Homepage Route
app.get("/", (req, res) => {
  res.render("index");
});

// controllers
app.use("/users", require("./controllers/users"));
app.use("/profile", require("./controllers/profile"));
app.use("/deck", require("./controllers/deck"));

// server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  rowdyRes.print();
});
