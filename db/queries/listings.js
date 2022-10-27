const db = require('../connection');

const getListings = (min, max) => {
  if(!max) {
    return db.query(`
    SELECT * FROM listings
    WHERE price >= $1;`, [min])
      .then(listings => {
        return listings.rows;
      });
  }

  if (!min) {
    return db.query(`
  SELECT * FROM listings
  WHERE price <= $1;`, [max])
    .then(listings => {
      return listings.rows;
    });
  }

  return db.query(`
    SELECT * FROM listings
    WHERE price >= $1
    AND price <= $2;`, [min, max])
    .then(listings => {
      return listings.rows;
  });
};

const createListing = (listing) => {

return db.query(`INSERT INTO listings (title, description, price, img) VALUES ($1, $2, $3, $4)`, [listing.title, listing.description, listing.price, listing.img])


}


const getAllListings = () => {
  return db.query('SELECT * FROM listings;')
    .then(listings => {
      return listings.rows;
    });
};


const getListing = (id) => {
  return db.query('SELECT * FROM listings WHERE id = $1;', [id])
    .then(listings => {
      return listings.rows[0];
    });
};

module.exports = { getListings, getListing, getAllListings, createListing };
