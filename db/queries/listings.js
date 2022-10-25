const db = require('../connection');

const getListings = () => {
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

module.exports = { getListings, getListing };
