const express = require('express');
const { getUserById } = require('../db/queries/users');
const { getListings, getListing, getAllListings } = require('../db/queries/listings');
const { postFavorite } = require('../db/queries/favorites');
const router  = express.Router();

router.get('/create', (req, res) => {
  const userID = +req.headers.cookie.split("=")[1];    // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) =>{
    res.render('listings-create', {user});
  })
});


router.get('/:id', (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1];
  getUserById(userID).then((user) =>{
    getListing(listingID).then((data) => {
      res.render('listing', { data, user });
    })
  })
})


router.get('/', (req, res) => {
  const userID = +req.headers.cookie.split("=")[1]; // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) =>{
    getAllListings()
    .then((data) => {
      res.render('listings', {data, user});
    })
  })
});


router.post('/', (req, res) => {
  let min = req.body.lowest_price * 100;
  let max = req.body.highest_price * 100;
  const userID = +req.headers.cookie.split("=")[1]; // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) =>{
    getListings(min, max)
    .then((data) => {
      res.render('listings', {data, user});
    })
  })
});


router.post('/:id', (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1];
  postFavorite(userID, listingID).then(() =>{
    res.redirect('/listings')
  })
})


module.exports = router;
