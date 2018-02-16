const DefaultCustomer = require('./DefaultCustomer');
const {
  DiscountOnProductRule,
} = require('../pricingRules');
const PremiumAd = require('../products/models/PremiumAd');

module.exports = class Nike extends DefaultCustomer{
  static identifier() {
    return 'Nike';
  }
  
  static personalPricingRules() {
    return [
      this.priceDropOnPremiumAd(37999),
    ];
  }

  static priceDropOnPremiumAd(finalPrice){
    const productId = PremiumAd.identifier();
    const discount = PremiumAd.basePrice() - finalPrice;

    return new DiscountOnProductRule(productId,discount, 4);
  }
};
