const ENVIRONMENT = process.env.NODE_ENV || 'development';
const databaseConfig = require('./databaseConfig');

module.exports = {
  appName: 'seek-job-challenge',
  environment: ENVIRONMENT,
  port: process.env.PORT || 9000,
  databaseConfig: databaseConfig[ENVIRONMENT],
};
