const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const { getFavorites } = require("../db/queries/favorites");
const { getListings, getListing } = require("../db/queries/listings");

// router.get("/", (req, res) => {
//   getListings().then((data) => {
//     console.log("data: ", data);
//     res.render("favorites", { data });
//   });
// });

router.get("/", (req, res) => {
  const listingID = req.params.id
  const userID = +req.headers.cookie.split("=")[1];
  console.log('userID=== ', userID);
  getFavorites(userID)
    .then((data) => {
      console.log("favorites data===", data);
      res.render("favorites", { data });
    });
});

//filter by price range
// router.get("/filter", (req, res) => {
//   // const min = req.query.min
//   // const max = req.query.max

//   getFilteredByPrice(null, null, '10')
//     .then(data => {
//      res.render("favorites", { data });
//   })
// })

module.exports = router;
