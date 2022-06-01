require("dotenv").config();

const express = require("express");
const rowdy = require("rowdy-logger");
const cookieParser = require("cookie-parser");
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const db = require("./models");
const methodOverride = require("method-override");
const res = require("express/lib/response");

// app config
const PORT = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");

// middlewares
const rowdyRes = rowdy.begin(app);
app.use(require("express-ejs-layouts"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// auth middleware
app.use(async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (cookies.userId) {
      const userId = cookies.userId;
      const decryptedId = cryptoJS.AES.decrypt(
        userId,
        process.env.ENC_KEY
      ).toString(cryptoJS.enc.Utf8);
      const user = await db.user.findByPk(decryptedId);

      res.locals.user = user;
    } else {
      res.locals.user = null;
    }
  } catch (err) {
    console.warn(err);
  } finally {
    next();
  }
});

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", { msg: null });
});

app.post("/", async (req, res) => {
  try {
    const input = req.body;
    // find the user using credentials they are trying to log in with
    const foundUser = await db.user.findOne({
      where: { email: input.email },
    });

    if (!foundUser) {
      res.render("index.ejs", { msg: "Could not find user, please try again" });
      return;
    }

    // if user is found, check password
    const compare = bcrypt.compareSync(input.password, foundUser.password);
    if (compare) {
      const encryptedId = cryptoJS.AES.encrypt(
        foundUser.id.toString(),
        process.env.ENC_KEY
      ).toString();
      res.cookie("userId", encryptedId);
      res.redirect("/profile");
    } else {
      res.render("index", {
        msg: "Email and password does not match, try again...",
      });
    }
  } catch (err) {
    console.warn(err);
  }
});

// GET // Logs user out
app.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
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
