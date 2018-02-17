module.exports = class AbstractPricingRule {
  apply(products) {
    if(this.satisfiesRuleCondition(products)) this.applyRule(products);
  }

  static identifier(){
    throw new Error('identifier() not implemented');
  }

  satisfiesRuleCondition(products){
    throw new Error('satisfiesRuleCondition(products) not implemented');
  }

  applyRule(products){
    throw new Error('applyRule(products) not implemented');
  }
};
