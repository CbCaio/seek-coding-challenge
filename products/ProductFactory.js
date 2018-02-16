const AbstractFactory = require('./abstracts/AbstractFactory');
const products = require('./models');

class ProductFactory extends AbstractFactory{
  productSelector(productId){
    const productToMake = products.find(p => p.identifier() === productId);

    if(!productToMake){
      throw new Error('invalid product');
    }

    return productToMake;
  }
}

module.exports = new ProductFactory(); 
