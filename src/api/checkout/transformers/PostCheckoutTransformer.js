const DefaultTransformer = require('../../common/DefaultTransformer');

module.exports = class PostCheckoutTransformer extends DefaultTransformer{
  static statusCode() {
    return 204;
  }
};
