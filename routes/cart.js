const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// gets products from the cart of one user
router.get('/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);

  knex.raw(
`SELECT users.email ,
products.title,
products. description,
products.price
FROM cart
INNER JOIN users ON users.id = cart.user_id
INNER JOIN products ON products.id = cart.products_id
WHERE users.id = ? ;`, [userId])
    .then(cart => {
      if(!cart || !cart.rowCount) {
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

// delete an item from cart
router.delete('/:user_id/:products_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const productsId = parseInt(req.params.products_id);

  knex.raw(
`DELETE 
FROM cart
WHERE (cart.user_id = ? AND cart.products_id = ?);`, [userId, productsId])
    .then(cart => {
      if(!cart || !cart.rowCount) {
        throw new Error('cart item delete unsuccessful!');
      }
      
      res.send('cart item deleted!');
    })
    .catch(err => res.status(400).send(err.message));
});

module.exports = router;