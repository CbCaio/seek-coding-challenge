const PricingRulesFactory = require('../PricingRulesFactory');
const { DISCOUNT_ON_PRODUCT } = require('../rulesDictionary');

module.exports = function priceDropOnProduct(ruleConfiguration = {}){
  const { product, finalPrice } = ruleConfiguration;

  const Rule = PricingRulesFactory.make(DISCOUNT_ON_PRODUCT);
  const productId = product.identifier();
  const discount = product.basePrice() - finalPrice;

  return new Rule(productId,discount);
};
