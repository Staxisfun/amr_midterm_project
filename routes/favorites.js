const express = require('express');
const router  = express.Router();
const { getFavorites } = require('../db/queries/favorites');
const { getListings, getListing } = require('../db/queries/listings');

router.get('/', (req, res) => {
  let listings = [];
  getListings().then((data) => {
    console.log("data: ", data)
    res.render('favorites', {data});
  })

});


router.get('/', (req, res) => {
  let favorites = []
  getFavorites().then((data) => {
    console.log("favorites data: ", data)
    // favorites = JSON.stringify(data)
    res.render('favorites', {data});
    // favorites = JSON.stringify(data)
    // res.render('favorites', {favorites});
  })

});


module.exports = router;
