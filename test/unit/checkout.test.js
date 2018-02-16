const Checkout = require('../../Checkout');
const Unilever = require('../../customers/Unilever');
const DefaultCustomer = require('../../customers/DefaultCustomer');
const products = require('../../products/models');
const { DiscountOnProductRule } = require('../../pricingRules');

test('it can add any product to checkout using product id', () => {
  const ch = new Checkout();
  products.forEach(p => ch.add(p.identifier()));
  const expectedProductsInCheckout = {};
  
  for(let p of products){
    expectedProductsInCheckout[p.identifier()] = [ new p() ];
  }

  expect(ch.productGroups).toEqual(expectedProductsInCheckout);
});

test('it can calculate totalPerProduct()', () => {
  const ch = new Checkout();
  const expectedTotalPerProduct = {};
  
  products.forEach(p => {
    const productIdentifier = p.identifier(); 
    ch.add(productIdentifier);
    ch.add(productIdentifier);
    expectedTotalPerProduct[productIdentifier] = p.basePrice() * 2; 
  });

  expect(ch.totalPerProduct).toEqual(expectedTotalPerProduct);
});

test('it can calculate totalAllProducts()', () => {
  const ch = new Checkout();
  let expectedTotal = 0;
  products.forEach(p => {
    const productIdentifier = p.identifier(); 
    ch.add(productIdentifier);
    ch.add(productIdentifier);
    expectedTotal += (p.basePrice() * 2); 
  });

  expect(ch.totalAllProducts).toEqual(expectedTotal);
});

describe('it can retrieve customerPricingRules()', () => {
  test('based on defined customer', () => {
    const ch = new Checkout();
    ch.customer = Unilever;
    expect(ch.customerPricingRules).toEqual(Unilever.personalPricingRules());
  });
  test('and set to default customer when none is defined', () => {
    const ch = new Checkout();
    expect(ch.customerPricingRules).toEqual(DefaultCustomer.personalPricingRules());
  });
});

describe('it can calculate total()', () =>{
  test('without any pricing rule defined', () => {
    const ch = new Checkout();
    let expectedTotal = 0;
    products.forEach(p => {
      const productIdentifier = p.identifier(); 
      ch.add(productIdentifier);
      ch.add(productIdentifier);
      expectedTotal += (p.basePrice() * 2); 
    });

    expect(ch.total()).toEqual(expectedTotal);
  });
  test('with a general pricing rule defined', () => {
    const productExample = products[0];
    const productIdentifier = productExample.identifier();
    const productBasePrice = productExample.basePrice();
    const discount = 100;    
    const pricingRule = new DiscountOnProductRule(productIdentifier,discount, 2);

    const ch = new Checkout([pricingRule]);

    let expectedTotal = 0;
    ch.add(productIdentifier);
    ch.add(productIdentifier);
    expectedTotal += productBasePrice * 2;
    expect(ch.total()).toEqual(expectedTotal);
    ch.add(productIdentifier);
    expectedTotal = ((productBasePrice - 100) * 3);
    expect(ch.total()).toEqual(expectedTotal);
  });
  test('with a customer pricing rule defined', () => {
    const ch = new Checkout();
    ch.customer = Unilever;
    const productOnDiscount = 'classic';
    const productBasePrice = 
      products.find(p => p.identifier() === productOnDiscount)
      .basePrice();

    let expectedTotal = 0;
    ch.add(productOnDiscount);
    ch.add(productOnDiscount);
    ch.add(productOnDiscount);
    expectedTotal += productBasePrice * 2;
    expect(ch.total()).toEqual(expectedTotal);
  });
});
