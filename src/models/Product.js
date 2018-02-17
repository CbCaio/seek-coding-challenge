module.exports = class Product {
  constructor(identifier,currentPrice,discount, features){
    this.identifier = identifier;
    this.currentPrice = currentPrice;
    this.discount = discount || 0;
    this.features = features || [];
  }

  finalPrice() {
    return this.currentPrice - this.discount;
  }
};
