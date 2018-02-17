const { NormalizedProduct } = require('../../../models');
const { groupBy } = require('lodash');

module.exports = function normalizeProductInShoppingCart(shoppingCartItems, shouldGroup = true){
  let normalizedProducts = shoppingCartItems.map((item) => {
    const { discount } = item;
    const { basePrice, features, id } = item.product;
    return new NormalizedProduct(id,basePrice,discount, features);
  });

  if(shouldGroup) normalizedProducts = groupBy(normalizedProducts,'identifier');

  return normalizedProducts;
};
