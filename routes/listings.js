const express = require('express');
const { getListings,
  getListing,
  getAllListings,
  markListingSold,
  removeListing,
  createListing } = require('../db/queries/listings');

const { getUserById } = require('../db/queries/users');
const router = express.Router();

// --- GET routes

router.get('/create', (req, res) => {
  const userID = +req.headers.cookie.split("=")[1];    // take cookies from header -- '+' coverts it to number
  getUserById(userID).then((user) => {
    res.render('listings-create', { user });
  });
});


// specific listing
router.get('/:id', (req, res) => {
  const listingID = req.params.id;
  const userID = +req.headers.cookie.split("=")[1];
  getUserById(userID).then((user) => {
    // <<<<<<< HEAD
    getListing(listingID).then((listing) => {
      getUserById(listing.user_id).then((seller) => {
        console.log({seller})
        res.render('listing', { listing, seller, user });
      });
    });
  });
});


router.get('/', (req, res) => {
  const userID = +req.headers.cookie.split("=")[1]; // take cookies from header -- '+' coverts it to number
  getUserById(userID)
  .then((user) => {
    getAllListings()
      .then((data) => {
        res.render('listings', { data, user });
      });

  });
});


//post route for creating new listing
router.post('/', (req, res) => {
  const listing = req.body;
  const userID = +req.headers.cookie.split("=")[1];
  console.log("reqbody: ", req.body);
  if (!listing.title || !listing.description || !listing.price || !listing.img) {
    return res.send("Please complete entire form");
  }
  if (isNaN(listing.price) || listing.price < 1) {
    return res.send("Please enter a valid price");
  }

    createListing(listing, userID)
      .then(() => {
        res.redirect('/');
      });

    });


    router.post('/filter', (req, res) => {
      let min = req.body.lowest_price * 100;
      let max = req.body.highest_price * 100;
      const userID = +req.headers.cookie.split("=")[1]; // take cookies from header -- '+' coverts it to number
      getUserById(userID).then((user) => {
        getListings(min, max)
          .then((data) => {
            res.render('listings', { data, user });
          });
      });
    });


router.post('/:id/sold', (req, res) => {
  let id = req.params.id;
  markListingSold(id)
    .then(() => {
      res.redirect(`/listings/${id}`);
    });
});

router.post('/:id/remove', (req, res) => {
  let id = req.params.id;
  removeListing(id)
    .then(() => {
      res.redirect(`/listings`);
    });
});


module.exports = router;
