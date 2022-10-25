const db = require('../connection');

const getFavorites = () => {
  return db.query('SELECT * FROM favorites;')
    .then(favorites => {
      return favorites.rows;
    });
};


module.exports = { getFavorites };
