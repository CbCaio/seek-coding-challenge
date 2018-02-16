const DefaultCustomer = require('./DefaultCustomer');
const {
  DiscountOnProductRule,
  XforYRule,
} = require('../pricingRules');
const ClassicAd = require('../products/models/ClassicAd');
const StandoutAd = require('../products/models/StandoutAd');
const PremiumAd = require('../products/models/PremiumAd');

module.exports = class Ford extends DefaultCustomer{
  static identifier() {
    return 'Ford';
  }
  
  static personalPricingRules() {
    return [
      this.deal5For4OnClassicAds(),
      this.priceDropOnStandoutAd(30999),
      this.priceDropOnPremiumAd(38999),
    ];
  }

  static deal5For4OnClassicAds(){
    const classicAdId = ClassicAd.identifier();
    return new XforYRule(classicAdId,5,classicAdId,1);
  }

  static priceDropOnStandoutAd(finalPrice){
    const productId = StandoutAd.identifier();
    const discount = StandoutAd.basePrice() - finalPrice;

    return new DiscountOnProductRule(productId,discount);
  }

  static priceDropOnPremiumAd(finalPrice){
    const productId = PremiumAd.identifier();
    const discount = PremiumAd.basePrice() - finalPrice;

    return new DiscountOnProductRule(productId,discount, 3);
  }
};
