const Product = require('../abstracts/AbstractProduct');
const {
  ALLOWS_COMPANY_LOGO, 
  ALLOWS_LONGER_PRESENTATION_TEXT, 
  BASIC_ADVERTISEMENT_LEVEL,
} = require('./featuresDictionary');

module.exports = class StandoutAd extends Product{
  static identifier() {
    return 'standout';
  }

  static features() {
    return [
      BASIC_ADVERTISEMENT_LEVEL,
      ALLOWS_COMPANY_LOGO,
      ALLOWS_LONGER_PRESENTATION_TEXT,
    ];
  }
  
  static basePrice(){
    return 32299;
  }
};
