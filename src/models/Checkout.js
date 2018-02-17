module.exports = class Checkout {
  constructor(customer, productGroups, pricingRules){
    this.customer = customer;
    this.productGroups = productGroups || {};
    this.generalPricingRules = pricingRules || [];
  }

  add(product) {
    const productIdentifier = product.identifier;
    let productGroup = this.productGroups[productIdentifier];
    if(!productGroup) this.productGroups[productIdentifier] = [];
    this.productGroups[productIdentifier].push(product);
    this.applyPricingRules();
  }

  applyPricingRules() {
    this.generalPricingRules.forEach(rule => rule.apply(this.productGroups));
    this.customerPricingRules().forEach(rule => rule.apply(this.productGroups));
  }
  
  total() {
    this.applyPricingRules();
    return this.totalAllProducts();
  }

  totalPerProduct() {
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

  totalAllProducts() {
    return Object.values(this.totalPerProduct())
      .reduce(
        (acc, productTotal) => acc + productTotal
        ,0
      );
  }

  customerPricingRules() {
    return this.customer.personalPricingRules || [];
  }
};
