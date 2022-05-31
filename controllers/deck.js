const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("deck/deck");
});

router.get("/new", (req, res) => {
  res.render("deck/new");
});

module.exports = router;
