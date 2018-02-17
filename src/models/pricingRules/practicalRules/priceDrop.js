const { DiscountOnProductBaseRule } = require('../baseRules');

module.exports = function priceDropOnProduct(ruleConfiguration = {}){
  const { 
    productId,
    finalPrice,
    minimumProductsToEnable,
  } = ruleConfiguration;

  return new DiscountOnProductBaseRule(productId,finalPrice,minimumProductsToEnable);
};
