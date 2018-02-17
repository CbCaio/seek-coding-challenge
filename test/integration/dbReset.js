const { db } = require('../../src/database');

async function dbReset() {
  await db.knex.migrate.rollback();

  return db.knex.migrate.latest();
}

module.exports = dbReset;
