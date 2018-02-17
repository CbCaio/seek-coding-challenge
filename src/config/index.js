const applicationConfig = require('./applicationConfig');

module.exports = {
  applicationConfig,
  runningDatabaseConfig: applicationConfig.databaseConfig,
};
