const express = require('express');
const { getListings } = require('../db/queries/listings');
const router  = express.Router();

router.get('/', (req, res) => {
  // let listings = JSON.stringify(getListings())
  let listings = []
  getListings().then((data) => {
    console.log("data: ", data)
    // listings = JSON.stringify(data)
    res.render('listings', {data});
    // listings = JSON.stringify(data)
    // res.render('listings', {listings:listings});
  })
  console.log("listing: ", listings)

});

router.get('/create', (req, res) => {
  res.render('listings-create');
});



module.exports = router;
