const express = require('express');
const { getListings, getListing } = require('../db/queries/listings');
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




router.get('/', (req, res) => {
  getListings().then((data) => {
    res.render('listings', {data});
  })
});




// router.get('/:id', (req, res) => {
//   getListing().then((data) => {
//     console.log("listing data:", data);
//     res.render('listing', {data});
//   })
//   res.render('listing');
// })






    module.exports = router;
