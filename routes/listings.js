const express = require('express');
const { getListings, getListing, getAllListings } = require('../db/queries/listings');
const router  = express.Router();


router.get('/create', (req, res) => {
  res.render('listings-create');
});


router.get('/:id', (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1];
  // take cookies from header -- '+' coverts it to number
  // console.log("userID:", userID);
  // console.log("listings id:", listingID)

  getListing(listingID).then((data) => {
    res.render('listing', {data : {...data, ...{currentUserId: userID}}});
  })

})

router.post('/', (req, res) => {
  let min = req.body.lowest_price * 100;
  let max = req.body.highest_price * 100;
  getListings(min, max)
    .then((data) => {
      res.render('listings', {data});
    })
});

router.get('/', (req, res) => {
  getAllListings()
  .then((data) => {
    res.render('listings', {data});
  })
});


module.exports = router;
