const BaseResponseBuilder = require('../../common/BaseResponseBuilder');
const { Customer } = require('../../../database/objection/db').models;
const {
  normalizeCustomer,
  normalizeProductInShoppingCart,
} = require('../../common/services');
const { Checkout } = require('../../../models');
const GetCustomerByNameTransformer = require('../transformers/GetCustomerByNameTransformer');

module.exports = class GetCustomersByNameResponseBuilder extends BaseResponseBuilder {
  static async processData(options) {
    const { customerName } = options;

    const customer = await Customer.query()
      .findOne({ name: customerName })
      .eager('[discountGroup.discountRules, shoppingCartItems.product]')
      .throwIfNotFound();

    const normalizedCustomer = normalizeCustomer(customer);
    const normalizedProductsGroups = normalizeProductInShoppingCart(customer.shoppingCartItems);
    const checkout = new Checkout(normalizedCustomer, normalizedProductsGroups);
    
    return { customer, totalPrice: checkout.total() };
  }

  static transformer(){
    return GetCustomerByNameTransformer;
  }
};
