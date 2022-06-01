const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op } = require("sequelize");
const salts = 12;

// GET // Profiles page
router.get("/", (req, res) => {
  // check is user is logged in
  if (!res.locals.user) {
    res.render("index", {
      msg: "Please log in...",
    });
    return;
  }

  const user = res.locals.user;
  // console.log(res.locals.user, "user");

  // const userDecks = await db.deck.findAll()

  res.render("profile/profile", { user });
});

// GET // Render Edit page
router.get("/edit", (req, res) => {
  const user = res.locals.user;
  res.render("profile/edit", { user, msg: null });
});

// PUT // Edit Profile
router.put("/edit", async (req, res) => {
  const user = res.locals.user;
  const input = req.body;
  try {
    const foundUser = await db.user.findOne({
      where: { id: user.id },
    });

    const matchingUsers = await db.user.findAll({
      where: {
        [Op.or]: [{ email: input.email }, { username: input.username }],
        [Op.not]: [{ id: user.id }],
      },
    });

    console.log(matchingUsers, "sdkjfhasdjkfhasdkjfhsadkjfhaslkdfhadsf");

    if (matchingUsers.length === 0) {
      const hashedPass = bcrypt.hashSync(input.password, salts);

      await foundUser.set({
        email: input.email,
        username: input.username,
        password: hashedPass,
      });

      await foundUser.save();

      res.redirect("/profile");
    } else {
      res.render("profile/edit", {
        msg: "Email or Username already belongs to another user, try again...",
      });
    }
  } catch (err) {
    console.warn(err);
  }
});

module.exports = router;
