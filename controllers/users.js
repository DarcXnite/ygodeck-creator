const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("users page");
});

module.exports = router;
