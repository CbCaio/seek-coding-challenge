const { Customer, Product } = require('../../../database/objection/db').models;
const { Checkout } = require('../../../models');
const { flatMap } = require('lodash');

const {
  normalizeCustomer,
  normalizeProductInShoppingCart,
  normalizeSingleProduct,
} = require('../../common/services');

module.exports = async function addProductToCustomer(customerName, productName) {
  const customer = await Customer.query()
    .findOne({ name: customerName })
    .eager('[discountGroup.discountRules, shoppingCartItems.product]');

  const normalizedCustomer = normalizeCustomer(customer);
  const normalizedProductsGroups = normalizeProductInShoppingCart(customer.shoppingCartItems);
  const checkout = new Checkout(normalizedCustomer, normalizedProductsGroups);
  
  const productToAdd = await Product.query().findOne({ name: productName });
  const normalizedProductToAdd = normalizeSingleProduct(productToAdd); 

  checkout.add(normalizedProductToAdd);

  const newListOfItems = flatMap(Object.values(checkout.productGroups))
    .map((product) => {
      return {
        productId: product.identifier,
        discount: product.discount,
        finalPrice: product.finalPrice(),
      };
    }
  ); 

  await Customer.query()
    .upsertGraph({
      id: customer.id,
      discountGroupId: customer.discountGroupId,
      name: customer.name,
      shoppingCartItems: newListOfItems,
    });

  return;
};
