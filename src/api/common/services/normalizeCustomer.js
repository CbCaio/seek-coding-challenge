const {
  NormalizedCustomer,
  PricingRuleFactory,
} = require('../../../models');

module.exports = function normalizeCustomer(customer){
  let customerPricingRules = null;
  const customerDiscountGroup = customer.discountGroup;
  if(customerDiscountGroup){
    const customerPersonalPricingRules = customerDiscountGroup.discountRules;
    customerPricingRules = customerPersonalPricingRules.map(
      (rule) => {
        const { ruleIdentifier, ruleConfiguration } = rule;
        return PricingRuleFactory.make(ruleIdentifier, ruleConfiguration);
      }
    );
  }

  return new NormalizedCustomer(customer.id, customerPricingRules);
};
