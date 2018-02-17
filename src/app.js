const Express = require('express');
const path = require('path');
const api = require('./api');
const bodyParser = require('body-parser');
const { SchemaValidationError } = require('is-express-schema-valid').default;

const app = new Express();

app.set('json spaces', 2);
app.use(bodyParser.json()),

// ROUTES
app.use(api);

// CONTRACTS
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'contracts/index.html'));
});
app.use('/contracts', Express.static(path.join(__dirname, 'contracts')));


// ERROR HANDLER
app.use(function errorHandlerMiddleware (err, req, res, next) {
  // handle schema validation error
  if (err instanceof SchemaValidationError) {
      res.status(400).json({ errors: err.errors });
      next();
  }
  next();
});

module.exports = app;
