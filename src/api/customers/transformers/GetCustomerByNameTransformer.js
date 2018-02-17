const DefaultTransformer = require('../../common/DefaultTransformer');

module.exports = class GetCustomerByNameTransformer extends DefaultTransformer{
  static body(builderResponse) {
    const { customer, totalPrice } = builderResponse;

    let shoppingCartItems = customer.shoppingCartItems || []; 

    shoppingCartItems = shoppingCartItems.map((item) => {
      return {
        discount: item.discount,
        finalPrice: item.finalPrice,
        product: item.product,
      };
    });

    return {
      name: customer.name,
      shoppingCart: {
        items: shoppingCartItems,
        totalPrice,
      },
    };
  }
};
