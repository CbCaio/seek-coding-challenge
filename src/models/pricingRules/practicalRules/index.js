const { BUY_X_GET_Y, DISCOUNT_ON_PRODUCT } = require('./rulesDictionary');

module.exports = {
  [`${BUY_X_GET_Y}`]: require('./buyXgetY'),
  [`${DISCOUNT_ON_PRODUCT}`]: require('./priceDrop'),
};
