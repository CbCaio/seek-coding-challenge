const { Model } = require('objection');

module.exports = class Customer extends Model {
  static get tableName() {
    return 'customers';
  }

  static get relationMappings() {
    const { ShoppingCart } = require('../models');
    const { DiscountGroup } = require('../models');

    return {
      shoppingCart: {
        relation: Model.HasOneRelation,
        modelClass: ShoppingCart,
        join: {
          from: `${this.tableName}.id`,
          to: `${ShoppingCart.tableName}.customerId`,
        },
      },
      discountGroup: {
        relation: Model.BelongsToOneRelation,
        modelClass: DiscountGroup,
        join: {
          from: `${this.tableName}.discountGroupId`,
          to: `${DiscountGroup.tableName}.id`,
        },
      },
    };
  }
};
