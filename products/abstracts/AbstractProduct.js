module.exports = class AbstractProduct {
  constructor(){
    this.discount = 0;
    this.currentPrice = this.constructor.basePrice();
    this.identifier = this.constructor.identifier();
    this.features = this.constructor.features();
  }

  static identifier() {
    throw new Error('identifier() not implemented');
  }

  static features() {
    throw new Error('features() not implemented');
  }

  static basePrice() {
    throw new Error('price() not implemented');
  }

  finalPrice() {
    return this.currentPrice - this.discount;
  }
};
