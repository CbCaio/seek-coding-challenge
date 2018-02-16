const PricingRule = require('./AbstractPricingRule');

module.exports = class DiscountOnProductRule extends PricingRule {
  constructor(productId, discountValue, minimumProductsToEnable = 1){
    super();
    this.targetProductId = productId;
    this.discountValue = discountValue;
    this.minimumProductsToEnable = minimumProductsToEnable;
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
