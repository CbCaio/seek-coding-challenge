const PricingRule = require('../abstracts/AbstractPricingRule');

module.exports = class DiscountOnProduct extends PricingRule {
  constructor(productId, finalPrice, minimumProductsToEnable = 1){
    super();
    this.targetProductId = productId;
    this.finalPrice = finalPrice;
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
      let discount = product.currentPrice - this.finalPrice;
      discount = (discount > 0) ? discount : product.currentPrice;
      product.discount = discount;
    }  
  }
};
