const AbstractFactory = require('./abstracts/AbstractFactory');
const rules = require('./practicalRules');

class PricingRuleFactory extends AbstractFactory{
  entitySelector(id){
    const ruleToMake = rules[id];

    if(!ruleToMake){
      throw new Error('invalid product');
    }

    return ruleToMake;
  }
}

module.exports = new PricingRuleFactory(); 
