const PricingRule = require('../abstracts/AbstractPricingRule');
const { BUY_X_GET_Y } = require('../rulesDictionary');

module.exports = class XforYRule extends PricingRule {
  constructor(productXId,XValue, productYId, YValue){
    super();
    this.productXId = productXId;
    this.productYId = productYId;
    this.XValue = XValue;
    this.YValue = YValue;
  }

  static identifier() {
    return BUY_X_GET_Y;
  }
  
  satisfiesRuleCondition(products){
    const productsX = products[this.productXId] || [];
    const totalProductXBought = productsX.length;

    return (totalProductXBought >= this.XValue);
  }

  applyRule(products) {
    const productsY = products[this.productYId];
    const totalProductXBought = products[this.productXId].length;
    let totalProductYToGiveLeft = 
      Math.trunc(totalProductXBought / this.XValue) * this.YValue;

    for(let productY of productsY){
      if(totalProductYToGiveLeft > 0){
        productY.discount = productY.finalPrice();
        totalProductYToGiveLeft -= 1;
      }
    }
  }
};
