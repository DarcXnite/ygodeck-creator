const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const db = require("../models");

// GET // Profiles page
router.get("/", (req, res) => {
  // check is user is logged in
  if (!res.locals.user) {
    res.render("index", {
      msg: "Please log in...",
    });
    return;
  }

  // const user = res.locals.user;
  console.log(res.locals.user, "user");

  // const userDecks = await db.deck.findAll()

  res.render("profile/profile.ejs", { user: res.locals.user });
});

module.exports = router;
