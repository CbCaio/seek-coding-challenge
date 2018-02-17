const { runningDatabaseConfig } = require('../../config');

const knex = require('knex')(runningDatabaseConfig);
const {
  Customer,
  DiscountGroup,
  DiscountRule,
  Product,
  ShoppingCart,
} = require('./models');

module.exports = {
  models: {
    Customer: Customer.bindKnex(knex),
    DiscountGroup: DiscountGroup.bindKnex(knex),
    DiscountRule: DiscountRule.bindKnex(knex),
    Product: Product.bindKnex(knex),
    ShoppingCart: ShoppingCart.bindKnex(knex),
  },
};
