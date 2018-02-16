module.exports = class AbstractFactory {
  productSelector(productId) {
    throw new Error('factoryMethod not implemented');
  }

  make(productId){
    return new (this.productSelector(productId));
  }
};
