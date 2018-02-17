const { db } = require('../../src/database');

module.exports = () => {
  return db.knex.migrate.rollback();
};
