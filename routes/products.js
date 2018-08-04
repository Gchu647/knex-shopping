const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// get all products
router.get('/', (req, res) => {
  knex.raw(`SELECT * FROM products;`)
    .then(products => {
      console.log(products);
      if(!products ||!products.rowCount) {
        throw new Error('Product not found');
      }
      
      res.json(products.rows);
    })
    .catch(err => res.status(400).send(err.message));
});

// gets a single product from user
router.get('/:product_id', (req, res) => {
  const id = req.params.product_id;

  knex.raw(
`SELECT title, description, inventory, price 
FROM products
WHERE id=? ;`, [id])
    .then(product => {
      if(!product ||!product.rowCount) {
        throw new Error('Product not found');
      }
      
      res.json(product.rows[0]);
    })
    .catch(err => res.status(400).send(err.message));
});

// posts a new product to products collection
router.post('/new', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const inventory = parseFloat(req.body.inventory);
  const price = parseFloat(req.body.price);

  knex.raw(
`INSERT INTO products(title, description, inventory, price)
VALUES (?, ?, ?, ?);`, [title, description, inventory, price])
    .then(product => {
      if(!product ||!product.rowCount) {
        throw new Error('User not found');
      }
      
      res.send(`${title} was added to products!`);
    })
    .catch(err => res.status(400).send(err.message));
});

// updated a product id with new information
router.put('/:product_id', (req, res) => {
  const id = req.params.product_id;
  const title = req.body.title;
  const description = req.body.description;
  const inventory = parseFloat(req.body.inventory);
  const price = parseFloat(req.body.price);

  knex.raw(
`UPDATE products 
SET title = ?, description = ?, inventory = ?, price = ?
WHERE id = ?`, [title, description, inventory, price, id])
    .then(product => {
      if(!product ||!product.rowCount) {
        throw new Error('Product not updated');
      }
      
      res.send(`Product id(${id}) is updated`);
    })
    .catch(err => res.status(400).send(err.message));
});

module.exports = router;