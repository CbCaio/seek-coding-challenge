const Product = require('../abstracts/AbstractProduct');
const {
  ALLOWS_COMPANY_LOGO, 
  ALLOWS_LONGER_PRESENTATION_TEXT, 
  BASIC_ADVERTISEMENT_LEVEL,
  HIGHER_VISIBILITY_TOP,
} = require('./featuresDictionary');

module.exports = class PremiumAd extends Product{
  static identifier() {
    return 'premium';
  }

  static features() {
    return [
      BASIC_ADVERTISEMENT_LEVEL,
      ALLOWS_COMPANY_LOGO,
      ALLOWS_LONGER_PRESENTATION_TEXT,
      HIGHER_VISIBILITY_TOP,
    ];
  }
  
  static basePrice(){
    return 39499;
  }
};
