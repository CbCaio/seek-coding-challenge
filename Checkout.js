const DefaultCustomer = require('./customers/DefaultCustomer');
const { ProductFactory } = require('./products');

module.exports = class Checkout {
  constructor(pricingRules){
    this.generalPricingRules = pricingRules || [];
    this.customer = DefaultCustomer;
    this.productGroups = {};
  }

  add(product) {
    const productItem = ProductFactory.make(product);
    const productIdentifier = productItem.identifier;
    let productGroup = this.productGroups[productIdentifier];
    if(!productGroup) this.productGroups[productIdentifier] = [];
    this.productGroups[productIdentifier].push(productItem);
  }

  applyPricingRules() {
    this.generalPricingRules.forEach(rule => rule.apply(this.productGroups));
    this.customerPricingRules.forEach(rule => rule.apply(this.productGroups));
  }
  
  total() {
    this.applyPricingRules();
    return this.totalAllProducts;
  }

  get totalPerProduct() {
    const productGroups = this.productGroups;
    const totalPerProduct = {};
    Object.keys(productGroups).forEach((productGroupIndex) => {
      const priceSum = productGroups[productGroupIndex].reduce(
        (sum, currentProduct) => sum + currentProduct.finalPrice(),
        0
      );
      return totalPerProduct[productGroupIndex] = priceSum;
    });
    return totalPerProduct;
  }

  get totalAllProducts() {
    return Object.values(this.totalPerProduct)
      .reduce((acc, productTotal) => acc + productTotal);
  }

  get customerPricingRules() {
    return this.customer.personalPricingRules() || [];
  }
};
