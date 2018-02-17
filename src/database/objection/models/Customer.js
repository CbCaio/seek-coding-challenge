const { Model } = require('objection');

module.exports = class Customer extends Model {
  static get tableName() {
    return 'customers';
  }

  static get relationMappings() {
    const { CustomerShoppingCartItem } = require('../models');
    const { DiscountGroup } = require('../models');

    return {
      shoppingCartItems: {
        relation: Model.HasManyRelation,
        modelClass: CustomerShoppingCartItem,
        join: {
          from: `${this.tableName}.id`,
          to: `${CustomerShoppingCartItem.tableName}.customerId`,
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
