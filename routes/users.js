/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getUserById } = require('../db/queries/users');
const router  = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id
  res.cookie('user_id', req.params.id)
  getUserById(id)
    .then(user => {
      if (user.admin) {
      return res.redirect('/admin')
      }

      res.redirect('/listings');
    })
});

module.exports = router;
