const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/new", async (req, res) => {
  res.send("booty booty");
});

module.exports = router;
