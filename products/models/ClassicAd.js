const Product = require('../abstracts/AbstractProduct');
const { BASIC_ADVERTISEMENT_LEVEL } = require('./featuresDictionary');

module.exports = class ClassicAd extends Product{
  static identifier() {
    return 'classic';
  }

  static features() {
    return [ 
      BASIC_ADVERTISEMENT_LEVEL,
    ];
  }
  
  static basePrice(){
    return 26999;
  }
};
