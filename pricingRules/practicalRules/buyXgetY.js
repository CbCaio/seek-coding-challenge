const PricingRulesFactory = require('../PricingRulesFactory');
const { BUY_X_GET_Y } = require('../rulesDictionary');

module.exports = function buyXgetY(ruleConfiguration = {}){
  const {
    productX, totalProductXToEnable,
    productY, totalProductYForFree,
  } = ruleConfiguration;

  const Rule = PricingRulesFactory.make(BUY_X_GET_Y);
  const productXId = productX.identifier();
  const productYId = productY.identifier();

  return new Rule(productXId,totalProductXToEnable,productYId,totalProductYForFree);
};
