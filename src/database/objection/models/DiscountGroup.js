const { Model } = require('objection');

module.exports = class DiscountGroup extends Model {
  static get tableName() {
    return 'discount_groups';
  }

  static get relationMappings() {
    const { DiscountRule } = require('../models');

    return {
      discountRules: {
        relation: Model.ManyToManyRelation,
        modelClass: DiscountRule,
        join: {
          from: `${this.tableName}.id`,
          through: {
            from: 'discount_group_rules.discountGroupId',
            to: 'discount_group_rules.discountRuleId',
          },
          to: `${DiscountRule.tableName}.id`,
        },
      },
    };
  }
};
