const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const db = require("../models");
const salts = 12;

// GET // Renders new user page
router.get("/new", (req, res) => {
  res.render("users/new", { msg: null });
});

// POST // Create a new user
router.post("/new", async (req, res) => {
  try {
    const input = req.body;
    const hashedPass = bcrypt.hashSync(input.password, salts);
    const [user, userCreated] = await db.user.findOrCreate({
      where: { email: input.email },
      defaults: { username: input.username, password: hashedPass },
    });

    if (userCreated) {
      const encryptId = cryptoJS.AES.encrypt(
        user.id.toString(),
        process.env.ENC_KEY
      ).toString();

      res.cookie("userId", encryptId);
      res.redirect("/profile");
    } else {
      res.render("index.ejs", {
        msg: "User already exists, please log in with your email and password",
      });
    }
  } catch (err) {
    console.warn(err);
  }
});
// end of POST // (╯°□°）╯︵ ┻━┻

module.exports = router;
