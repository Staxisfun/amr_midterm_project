const db = require('../connection');

const getFavorites = () => {
  return db.query('SELECT * FROM favorites;')
    .then(favorites => {
      return favorites.rows;
    });
};

const getFilteredByPrice = (min, max , id) => {
  return db.query(`SELECT * FROM listings
    JOIN favorites ON listings.user_id = favorites.user_id
    WHERE favorites.user_id = ${id}`)
    .then(data => {
      return data.rows
    })
}

module.exports = { getFavorites, getFilteredByPrice };


