const express = require('express');
const { getListings, getListing } = require('../db/queries/listings');
const router  = express.Router();


router.get('/create', (req, res) => {
  res.render('listings-create');
});




router.get('/:id', (req, res) => {
  const id = req.params.id
  const userID = +req.headers.cookie.split("=")[1];    // take cookies from header -- '+' coverts it to number
  console.log("userID:", userID);
  console.log("listings id:", id)
  getListing(id).then((data) => {
    console.log("listing data:", {data : {...data, ...{currentUserId: userID}}});
    res.render('listing', {data : {...data, ...{currentUserId: userID}}});
  })
})




router.get('/', (req, res) => {
  // let listings = JSON.stringify(getListings())
  let listings = [];
  getListings().then((data) => {
    console.log("data: ", data)
    // listings = JSON.stringify(data)
    res.render('listings', {data});
    // listings = JSON.stringify(data)
    // res.render('listings', {listings:listings});
  })
  console.log("listing: ", listings)
});




// router.get('/:id', (req, res) => {
//   getListing().then((data) => {
//     console.log("listing data:", data);
//     res.render('listing', {data});
//   })
//   res.render('listing');
// })






    module.exports = router;
