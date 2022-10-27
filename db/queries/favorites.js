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

const postFavorite = (id, listing) => {
  return db.query(`INSERT INTO favorites (user_id, listing_id)
    VALUES ($1, $2);
  `, [id, listing])
}

// const getFilteredByPrice = (min, max , id) => {
//   return db.query(`SELECT * FROM listings
//     JOIN favorites ON listings.user_id = favorites.user_id
//     WHERE favorites.user_id = ${id}`)
//     .then(data => {
//       return data.rows
//     })
// }

module.exports = { getFavorites, postFavorite };


