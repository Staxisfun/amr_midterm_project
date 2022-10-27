const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const { getFavorites, addFavorite } = require("../db/queries/favorites");
const { getUserById } = require("../db/queries/users");

router.get("/", (req, res) => {
  const userID = +req.headers.cookie.split("=")[1];
  console.log('userID=== ', userID);
  getUserById(userID).then((user) =>{
  getFavorites(userID).then((favoritesData) => {
      // console.log("favorites data===", data);
      res.render("favorites", { favoritesData, user });
    });
  });
});

// add a listing to favorite
router.post("/", (req, res) => {
  const user_id = +req.headers.cookie.split("=")[1];
  const listing_id = req.body.listing_id;
  addFavorite(user_id, listing_id)
    .then(() => {
      res.redirect("/favorites");
    })
});

module.exports = router;
