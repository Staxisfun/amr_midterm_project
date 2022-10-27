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

const markListingSold = (id) => {
  return db.query(`
  UPDATE listings
  SET is_sold = true
  WHERE id = $1
  `, [id])
  .then(res => {
    return res.rows[0];
  });
}

const removeListing = (id) => {
  return db.query(`
  DELETE FROM listings
  WHERE id = $1
  `, [id])
  .then(res => {
    return res.rows
  });
}

module.exports = {
  getListings,
  getListing,
  getAllListings,
  markListingSold,
  removeListing
 };
