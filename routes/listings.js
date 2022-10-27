const express = require('express');
const { getListings, getListing, getAllListings, createListing } = require('../db/queries/listings');
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

//post route for creating new listing
router.post('/', (req, res) => {
const listing = req.body
console.log("reqbody: ", req.body)
if (!listing.title || !listing.description || !listing.price || !listing.img) {
  return res.send("Please complete entire form")
}
if (isNaN(listing.price) || listing.price < 1) {
  return res.send("Please enter a valid price")
}
createListing(listing)
.then(() => {
  res.redirect('/')
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
