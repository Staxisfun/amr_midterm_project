const db = require('../connection');

const getFavorites = (id) => {
  return db.query(`SELECT * FROM listings
  JOIN favorites
  ON listing_id = listings.id
  WHERE favorites.user_id = $1;
  `, [id])
    .then(favorites => {
      return favorites.rows;
    });
};

const addFavorite = (userID, listingID) => {
  return db.query(`INSERT INTO favorites (user_id, listing_id)
  VALUES ($1, $2)
  RETURNING *`, [userID, listingID])
}

module.exports = { getFavorites, addFavorite };


