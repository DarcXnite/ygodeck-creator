const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const db = require("../models");
const res = require("express/lib/response");

router.get("/", async (req, res) => {
  const user = res.locals.user;

  const allDecks = await db.deck.findAll({
    where: { userId: user.id },
  });

  res.render("deck/deck", { allDecks });
});

router.post("/", async (req, res) => {
  try {
    const input = req.body;

    const newDeck = await db.deck.create({
      deckName: input.deckName,
    });

    res.locals.user.addDeck(newDeck);

    res.redirect("/deck");
  } catch (err) {
    console.warn(err);
  }
});

router.get("/:id/results", async (req, res) => {
  const id = req.params.id;
  const query = req.query;

  try {
    const allSearchedCards = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${query.name}`
    );

    res.render("deck/edit", { id, allCards: allSearchedCards.data.data });
  } catch (err) {
    console.warn(err);
  }
});

router.post("/:id", async (req, res) => {
  // find the deck

  // deck.addCard(newcard)?

  // search cards to see if there are 3 or more via cardId
  try {
  } catch (err) {
    console.warn(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.render("deck/edit", { id, allCards: [] });
});

module.exports = router;
