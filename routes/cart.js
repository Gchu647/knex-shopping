const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// gets products from the cart of one user
router.get('/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);

  knex.raw(
`SELECT users.email ,products.*
FROM cart
INNER JOIN users ON users.id = cart.user_id
INNER JOIN products ON products.id = cart.products_id
WHERE users.id = ? ;`, [userId])
    .then(cart => {
      if(!cart ||!cart.rowCount) {
        throw new Error('Cart not found');
      }
      
      res.json(cart.rows);
    })
    .catch(err => res.status(400).send(err.message));
});

// make user id add an product
router.post('/:user_id/:products_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const productsId = parseInt(req.params.products_id);

  console.log('userId ', userId);
  console.log('productsId ', productsId);

  knex.raw(
`INSERT INTO cart(user_id, products_id)
 VALUES (?, ?);`, [userId, productsId])
    .then(cart => {
      if(!cart || !cart.rowCount) {
        throw new Error('Cart not added');
      }
      
      res.send(`user${userId} added product${productsId} into cart`);
    })
    .catch(err => res.status(400).send(err.message));
});

module.exports = router;