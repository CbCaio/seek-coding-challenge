const { Model } = require('objection');

module.exports = class CustomerShoppingCartItem extends Model {
  static get tableName() {
    return 'customer_shopping_carts';
  }

  static get relationMappings() {
    const { Product } = require('../models');
    const { Customer } = require('../models');

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: `${this.tableName}.productId`,
          to: `${Product.tableName}.id`,
        },
      },
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: `${this.tableName}.customerId`,
          to: `${Customer.tableName}.id`,
        },
      },
    };
  }
};
