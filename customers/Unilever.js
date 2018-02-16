const DefaultCustomer = require('./DefaultCustomer');
const {
  XforYRule,
} = require('../pricingRules');
const ClassicAd = require('../products/models/ClassicAd');

module.exports = class Unilever extends DefaultCustomer{
  static identifier() {
    return 'Unilever';
  }
  
  static personalPricingRules() {
    return [
      this.deal3For2OnClassicAds(),
    ];
  }

  static deal3For2OnClassicAds(){
    const classicAdId = ClassicAd.identifier();
    return new XforYRule(classicAdId,3,classicAdId,1);
  }
};
