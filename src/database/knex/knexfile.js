const { applicationConfig, runningDatabaseConfig } = require('../../config');

module.exports = {
  [`${applicationConfig.environment}`]: runningDatabaseConfig,
};
