const express = require('express');
const { getListings, getListing } = require('../db/queries/listings');
const { getUserById } = require('../db/queries/users');
const router  = express.Router();

router.get('/create', (req, res) => {
  const userID = +req.headers.cookie.split("=")[1];    // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) =>{
    res.render('listings-create', {user});
  })
});



router.get('/:id', (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1]; // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) =>{
    getListing(listingID).then((data) => {
      res.render('listing', {data : {...data, ...user, ...{currentUserId: userID}}});
    })
  })
})



router.get('/', (req, res) => {
  const userID = +req.headers.cookie.split("=")[1];    // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) =>{
    getListings().then((data) => {
      res.render('listings', {data, user});
    })
  })
});



module.exports = router;

