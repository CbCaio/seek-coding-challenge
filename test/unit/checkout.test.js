const { 
  Checkout,
  NormalizedCustomer,
  NormalizedProduct,
  PricingRuleFactory,
} = require('../../src/models');

const customerExample1 = new NormalizedCustomer('user1',[]);
const productExample1 = () => new NormalizedProduct('product1',1000);
const productExample2 = () => new NormalizedProduct('product2',2000);
const pricingRuleExample = PricingRuleFactory.make('DiscountOnProduct', {
  productId: 'product1',
  finalPrice: 199,
  minimumProductsToEnable: 2,
});
const customerExample2 = new NormalizedCustomer('user2',[pricingRuleExample]);

describe('The Checkout model', () => {
  describe('with customer without pricing rules defined', () => {
    test('can add products using add() method', () => {
      const ch = new Checkout(customerExample1);
      ch.add(productExample1());
      expect(ch.productGroups).toEqual({ [`${productExample1().identifier}`]: [productExample1() ] });
    });
   
    test('can calculate totalPerProduct()', () => {
      const ch = new Checkout(customerExample1);
      ch.add(productExample1());
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      expect(ch.totalPerProduct()).toEqual(
        {
          [`${productExample1().identifier}`]: (productExample1().currentPrice * 2),
          [`${productExample2().identifier}`]: (productExample2().currentPrice * 2),
        }
      );
    });    

    test('can calculate totalAllProducts()', () => {
      const ch = new Checkout(customerExample1);
      ch.add(productExample1());
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      const totalExpectedPrice = (productExample1().currentPrice * 2) + (productExample2().currentPrice * 2);
      expect(ch.totalAllProducts()).toEqual(totalExpectedPrice);
    });

    test('can calculate total()', () =>{
      const ch = new Checkout(customerExample1);
      ch.add(productExample1());
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      const totalExpectedPrice = (productExample1().currentPrice * 2) + (productExample2().currentPrice * 2);
      expect(ch.total()).toEqual(totalExpectedPrice);
    });

    test('with a general pricing rule defined', () => {
      const ch = new Checkout(customerExample1, null, [pricingRuleExample]);
      ch.add(productExample1());
      let totalExpectedPrice = productExample1().currentPrice;
      expect(ch.total()).toEqual(totalExpectedPrice);

      totalExpectedPrice = pricingRuleExample.finalPrice *2;
      ch.add(productExample1());
      expect(ch.total()).toEqual(totalExpectedPrice);
    });

    test('it can retrieve customerPricingRules()', () => {
      const ch = new Checkout(customerExample1);
      expect(ch.customerPricingRules()).toEqual([]);
    });
  }); 

  describe('with customer having pricing rules defined', () => {
    test('can add products using add() method', () => {
      const ch = new Checkout(customerExample2);
      ch.add(productExample2());
      expect(ch.productGroups).toEqual({ [`${productExample2().identifier}`]: [productExample2() ] });
    });
   
    test('can calculate totalPerProduct()', () => {
      const ch = new Checkout(customerExample2);
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      expect(ch.totalPerProduct()).toEqual(
        {
          [`${productExample1().identifier}`]: (productExample1().currentPrice * 1),
          [`${productExample2().identifier}`]: (productExample2().currentPrice * 2),
        }
      );
    });    

    test('can calculate totalAllProducts()', () => {
      const ch = new Checkout(customerExample2);
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      const totalExpectedPrice = (productExample1().currentPrice * 1) + (productExample2().currentPrice * 2);
      expect(ch.totalAllProducts()).toEqual(totalExpectedPrice);
    });

    test('can calculate total()', () =>{
      const ch = new Checkout(customerExample2);
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      const totalExpectedPrice = (productExample1().currentPrice * 1) + (productExample2().currentPrice * 2);
      expect(ch.total()).toEqual(totalExpectedPrice);
    });

    test('can calculate total() with pricing rule activated', () =>{
      const ch = new Checkout(customerExample2);
      ch.add(productExample1());
      ch.add(productExample1());
      ch.add(productExample1());
      ch.add(productExample2());
      ch.add(productExample2());
      const totalExpectedPrice = (pricingRuleExample.finalPrice * 3) + (productExample2().currentPrice * 2);
      expect(ch.total()).toEqual(totalExpectedPrice);
    });

    test('it can retrieve customerPricingRules()', () => {
      const ch = new Checkout(customerExample2);
      expect(ch.customerPricingRules()).toEqual(customerExample2.personalPricingRules);
    });
  });
});

