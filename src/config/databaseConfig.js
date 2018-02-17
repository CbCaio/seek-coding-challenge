const { knexSnakeCaseMappers } = require('objection');

module.exports = {
  development: {
    client: 'mysql2',
    connection: process.env.DB_CONNECTION_STRING || {
      host: process.env.DATABASE_HOST || 'mysql-docker',
      port: process.env.DATABASE_PORT || 3306,
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'db_seek_job_test',
      charset: 'utf8',
    },
    migrations: {
      directory: __dirname + '/../database/knex/migrations',
    },
    debug: false, ...knexSnakeCaseMappers(),
  },
  test: {
    client: 'mysql2',
    connection: {
      host: 'mysql-docker',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'db_seek_job_test',
      charset: 'utf8',
    },
    migrations: {
      directory: __dirname + '/../database/knex/migrations',
    },
    debug: false, ...knexSnakeCaseMappers(),
  },
};
