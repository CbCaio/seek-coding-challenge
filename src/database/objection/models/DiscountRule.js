const { Model } = require('objection');

module.exports = class DiscountRule extends Model {
  static get tableName() {
    return 'discount_rules';
  }

  static get relationMappings() {
    const { DiscountGroup } = require('../models');

    return {
      discountGroups: {
        relation: Model.ManyToManyRelation,
        modelClass: DiscountGroup,
        join: {
          from: `${this.tableName}.id`,
          through: {
            from: 'discount_group_rules.discount_rule_id',
            to: 'discount_group_rules.discount_group_id',
          },
          to: `${DiscountGroup.tableName}.id`,
        },
      },
    };
  }
};
