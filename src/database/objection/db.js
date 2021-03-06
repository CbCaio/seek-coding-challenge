const { runningDatabaseConfig } = require('../../config');

const knex = require('knex')(runningDatabaseConfig);
const {
  Customer,
  DiscountGroup,
  DiscountRule,
  Product,
  CustomerShoppingCartItem,
} = require('./models');

module.exports = {
  knex,
  models: {
    Customer: Customer.bindKnex(knex),
    DiscountGroup: DiscountGroup.bindKnex(knex),
    DiscountRule: DiscountRule.bindKnex(knex),
    Product: Product.bindKnex(knex),
    CustomerShoppingCartItem: CustomerShoppingCartItem.bindKnex(knex),
  },
};
