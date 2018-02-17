const { DiscountOnProductBaseRule } = require('../baseRules');

module.exports = function priceDropOnProduct(ruleConfiguration = {}){
  const { product, finalPrice } = ruleConfiguration;

  const productId = product.identifier();
  const discount = product.basePrice() - finalPrice;

  return new DiscountOnProductBaseRule(productId,discount);
};
