const { db, ensureConnection } = require('../../src/database');

module.exports = async () => {
  await ensureConnection(db.knex);
  return db.knex.migrate.rollback();
};
