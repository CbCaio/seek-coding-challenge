module.exports = class AbstractPricingRule {
  apply(products) {
    if(this.satisfiesRuleCondition(products)) this.applyRule(products);
  }

  satisfiesRuleCondition(products){
    throw new Error('satisfiesRuleCondition(products) not implemented');
  }

  applyRule(products){
    throw new Error('applyRule(products) not implemented');
  }
};
