const DefaultCustomer = require('./DefaultCustomer');
const {
  DiscountOnProductRule,
} = require('../pricingRules');
const StandoutAd = require('../products/models/StandoutAd');

module.exports = class Apple extends DefaultCustomer{
  static identifier() {
    return 'Apple';
  }
  
  static personalPricingRules() {
    return [
      this.priceDropOnStandoutAd(29999),
    ];
  }

  static priceDropOnStandoutAd(finalPrice){
    const standoutAdId = StandoutAd.identifier();
    const discount = StandoutAd.basePrice() - finalPrice;

    return new DiscountOnProductRule(standoutAdId,discount);
  }
};
