const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(users => {
      return users.rows;
    });
};

module.exports = { getUsers };
