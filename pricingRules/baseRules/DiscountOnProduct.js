const PricingRule = require('../abstracts/AbstractPricingRule');
const { DISCOUNT_ON_PRODUCT } = require('../rulesDictionary');

module.exports = class DiscountOnProduct extends PricingRule {
  constructor(productId, discountValue, minimumProductsToEnable = 1){
    super();
    this.targetProductId = productId;
    this.discountValue = discountValue;
    this.minimumProductsToEnable = minimumProductsToEnable;
  }
  
  static identifier() {
    return DISCOUNT_ON_PRODUCT;
  }

  satisfiesRuleCondition(products){
    const targetProducts = products[this.targetProductId] || [];
    const totalTargetProductBought = targetProducts.length;

    return (totalTargetProductBought >= this.minimumProductsToEnable);
  }

  applyRule(products) {
    const targetProducts = products[this.targetProductId];

    for(let product of targetProducts){
      product.discount = this.discountValue;
    }  
  }
};
