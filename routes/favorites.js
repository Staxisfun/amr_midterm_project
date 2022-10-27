const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const { getFavorites } = require("../db/queries/favorites");
const { getListings, getListing } = require("../db/queries/listings");
const { getUserById } = require('../db/queries/users');



router.get("/", (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1];
  console.log('userID=== ', userID);
  getUserById(userID).then((user) =>{
    getFavorites(userID).then((favoritesData) => {
      getListing(listingID).then((listingData) => {
        console.log("favorites data===", favoritesData);
        console.log("user:", user);
        res.render("favorites", { favoritesData, listingData, user });
      });
    })
  })
});



module.exports = router;
