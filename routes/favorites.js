const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const { getFavorites, addFavorite } = require("../db/queries/favorites");

router.get("/", (req, res) => {
  const userID = +req.headers.cookie.split("=")[1];
  console.log('userID=== ', userID);
  getFavorites(userID)
    .then((data) => {
      console.log("favorites data===", data);
      res.render("favorites", { data });
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
