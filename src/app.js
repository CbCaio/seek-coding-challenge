const Express = require('express');
const path = require('path');
const api = require('./api');
const bodyParser = require('body-parser');

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

module.exports = app;
