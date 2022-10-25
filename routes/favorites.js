const express = require('express');
const router  = express.Router();
const { getFavorites } = require('../db/queries/favorites');


router.get('/', (req, res) => {
  let favorites = []
  getFavorites().then((data) => {
    console.log("favorites data: ", data)
    favorites = JSON.stringify(data)
    res.render('favorites', {favorites});
  })

});





module.exports = router;
