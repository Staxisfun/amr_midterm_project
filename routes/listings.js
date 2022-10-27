const express = require('express');
const { getListings,
  getListing,
  getAllListings,
  markListingSold,
  removeListing } = require('../db/queries/listings');

const { getUserById } = require('../db/queries/users');
const router  = express.Router();

// --- GET routes

router.get('/create', (req, res) => {
  res.render('listings-create');
});


// specific listing
router.get('/:id', (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1];
  getUserById(userID).then((user) =>{
    getListing(listingID).then((listing) => {
      getUserById(listing.user_id).then((seller) => {
        res.render('listing', { listing, seller, user });
      })
    })
  })
});

// main page with all listings
router.get('/', (req, res) => {
  getAllListings()
  .then((data) => {
    res.render('listings', {data});
  })
});


// --- POST routes
router.post('/', (req, res) => {
  let min = req.body.lowest_price * 100;
  let max = req.body.highest_price * 100;
  getListings(min, max)
    .then((data) => {
      res.render('listings', {data});
    })
});

router.post('/:id/sold', (req, res) => {
  let id = req.params.id
  markListingSold(id)
    .then(() => {
      res.redirect(`/listings/${id}`)
    })
});

router.post('/:id/remove', (req, res) => {
  let id = req.params.id
  removeListing(id)
    .then(() => {
      res.redirect(`/listings`)
    })
});


module.exports = router;
