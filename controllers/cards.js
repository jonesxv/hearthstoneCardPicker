const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if (!req.session.deck) {
      req.session.deck = [];
    }
    knex('cards')
    .then(cards => {
      res.render('index', {cards: cards, deck: req.session.deck})
    })
  },
  create: function(req, res) {
    const card = req.body;
    console.log(card);
    knex('cards')
      .insert({
        mana: card.mana,
        attack: card.attack,
        health: card.health,
        description: card.description
      })
      .then(() => {
        res.redirect('/')
      })
  },
  add: function(req, res) {
    let id = req.params.id;
    knex('cards')
      .where('id', id)
      .then(result => {
        req.session.deck.push(result[0]);
        res.redirect('/')
      })
  },
  remove: function(req, res) {
    let id = req.params.id;
    let deck = req.session.deck;
    if (deck.length === 1) { req.session.deck = [] }
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].id == id) {
        deck.splice(i, 1);
        res.redirect('/');
        return;
      }
    }
  }
}
