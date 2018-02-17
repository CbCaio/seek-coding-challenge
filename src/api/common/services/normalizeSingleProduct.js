const { NormalizedProduct } = require('../../../models');

module.exports = function normalizeProductInShoppingCart(product){
  return new NormalizedProduct(
    product.id,
    product.basePrice,
    product.discount,
    product.features
  );
};
