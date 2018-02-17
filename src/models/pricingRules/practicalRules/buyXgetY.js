const { XforYBaseRule } = require('../baseRules');

module.exports = function buyXgetY(ruleConfiguration = {}){
  const {
    productXId, totalProductXToEnable,
    productYId, totalProductYForFree,
  } = ruleConfiguration;

  return new XforYBaseRule(
    productXId,
    totalProductXToEnable,
    productYId,
    totalProductYForFree
  );
};
