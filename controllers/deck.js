const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const db = require("../models");

// global var to NOT remove all searched card
let searchedCardsDB = [];

// GET // renders deck page
router.get("/", async (req, res) => {
  const user = res.locals.user;

  const allDecks = await db.deck.findAll({
    where: { userId: user.id },
  });

  res.render("deck/deck", { allDecks });
});

// POST // creates a new deck and associates it with user
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

// GET // Search for cards through API and renders on page
router.get("/:id/results", async (req, res) => {
  const id = req.params.id;
  const query = req.query;

  try {
    const foundDeck = await db.deck.findOne({
      where: { id: id },
    });
    const allCardsInDeck = await db.card.findAll({
      where: { deckId: foundDeck.id },
    });

    const allSearchedCards = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${query.name}`
    );

    searchedCardsDB = allSearchedCards.data.data;

    res.render("deck/edit", {
      id,
      searchedCardsDB,
      allCardsInDeck,
    });
  } catch (err) {
    console.warn(err);
  }
});

// POST // adds cards to deck
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const input = req.body;
  // find the deck

  // deck.addCard(newcard)?

  // search cards to see if there are 3 or more via cardId
  try {
    const foundDeck = await db.deck.findOne({
      where: { id: id },
    });

    const newCard = await db.card.create({
      cardid: input.cardid,
      name: input.name,
      imageUrl: input.image,
    });

    await foundDeck.addCard(newCard);

    const allCardsInDeck = await db.card.findAll({
      where: { deckId: foundDeck.id },
    });

    // console.log(allCardsInDeck);

    res.render("deck/edit", { id, searchedCardsDB, allCardsInDeck });
  } catch (err) {
    console.warn(err);
  }
});

// GET // renders edit deck page
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const foundDeck = await db.deck.findOne({
    where: { id: id },
  });
  const allCardsInDeck = await db.card.findAll({
    where: { deckId: foundDeck.id },
  });
  res.render("deck/edit", { id, searchedCardsDB, allCardsInDeck });
});

// DELETE // delete cards from table
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const input = req.body;

  try {
    const foundCardInDeck = await db.card.findOne({
      where: { id: input.id },
    });

    await foundCardInDeck.destroy();

    const foundDeck = await db.deck.findOne({
      where: { id: id },
    });
    const allCardsInDeck = await db.card.findAll({
      where: { deckId: foundDeck.id },
    });

    res.render("deck/edit", { id, searchedCardsDB, allCardsInDeck });
  } catch (err) {
    console.warn(err);
  }
});

module.exports = router;
