const BaseResponseBuilder = require('../../common/BaseResponseBuilder');
const addProductToCustomer = require('../services/addProductToCustomer');
const PostCheckoutTransformer = require('../transformers/PostCheckoutTransformer');

module.exports = class PostCheckoutResponseBuilder extends BaseResponseBuilder {
  static async processData(options) {
    const { customer, product } = options;

    return await addProductToCustomer(customer, product);
  }

  static transformer() {
    return PostCheckoutTransformer;
  }
};
