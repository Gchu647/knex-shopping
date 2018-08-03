const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// Get me all users
router.get('/', (req, res) => {
  knex.raw('SELECT * FROM users;')
    .then(user => {
      if(!user ||!user.rowCount) {
        throw new Error('User not found');
      }
      
      res.json(user.rows);
    })
    .catch(err => res.status(400).send(err.message));
});

// gets the information of one user
router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex.raw('SELECT id, email, password FROM users WHERE id = ? ;', [id])
    .then(user => {
      if(!user ||!user.rowCount) {
        throw new Error('User not found');
      }
      
      res.json(user.rows[0]);
    })
    .catch(err => res.status(400).send(err.message));
});

// registers a new user
router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  knex.raw(`INSERT INTO users(email, password) VALUES (?, ?);`, [email, password])
    .then (result => {
      if(!result || !result.rowCount) {
        throw new Error('Registration unsuccessful');
      }
      
      res.send('User registered!');
    })
    .catch(err => res.status(400).send(err.message));
})

// logins in a user with email and password
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  knex.raw(`SELECT id FROM users WHERE (email = ? AND password = ?);`, [email, password])
    .then (result => {
      if(!result || !result.rowCount) {
        throw new Error('Login incorrect');
      }
      
      const user_id = result.rows[0].id;
      res.redirect(`/users/${user_id}`);
    })
    .catch(err => res.status(400).send(err.message));
});

// Update user's password
router.put('/:id/forgot-password', (req, res) => {
  const id = req.params.id;
  const password = req.body.password;

  knex.raw('UPDATE users SET password = ? WHERE id = ?;', [password,id])
    .then(result => {
      if(!result || !result.rowCount) {
        throw new Error('Password update failed');
      }
      
      res.send('Password updated!');
    })
    .catch(err => res.status(400).send(err.message));
});

// deletes user by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  knex.raw('DELETE FROM users WHERE id = ? ;', [id])
    .then(result => {
      if(!result || !result.rowCount) {
        throw new Error('User id not found');
      }
      
      res.send('User deleted!');
    })
    .catch(err => res.status(400).send(err.message));
});



module.exports = router;