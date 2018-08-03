const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Got id: ', id);
  knex.raw('SELECT id, email, password FROM users WHERE id = ?', [id])
    .then(user => {
      if(!user ||!user.rowCount) {
        res.status(400).send('User not found');
      }

      // console.log(user);
      res.json(user.rows[0]);
    })
    .catch(err => console.log(err));
});

module.exports = router;