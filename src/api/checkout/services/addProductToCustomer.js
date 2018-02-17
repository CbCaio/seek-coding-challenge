const { Customer, Product, ShoppingCart } = require('../../../database/objection/db').models;

module.exports = async function addProductToCustomer(customerName, productName) {

  const customer = await Customer.query()
    .findOne({ name: customerName })
    .eager('discountGroup.discountRules');
  
  const product = await Product.query()
    .findOne({ name: productName });

  return 1;
};
