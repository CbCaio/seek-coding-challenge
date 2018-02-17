const app = require('./app');
const { applicationConfig } = require('./config');

try {
  app.listen(applicationConfig.port, () => console.log(`Listening on port ${applicationConfig.port}`));
}catch(e) {
  console.error(`Could not connect to database: ${e}`);
}
