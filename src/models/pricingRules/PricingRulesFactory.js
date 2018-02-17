const AbstractFactory = require('./abstracts/AbstractFactory');
const rules = require('./practicalRules');

class PricingRuleFactory extends AbstractFactory{
  entitySelector(ruleId, ruleConfiguration){
    const ruleToMake = rules[ruleId];

    if(!ruleToMake){
      throw new Error('invalid rule');
    }

    return ruleToMake(ruleConfiguration);
  }
}

module.exports = new PricingRuleFactory(); 
