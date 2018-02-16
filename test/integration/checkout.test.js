const Checkout = require('../../Checkout');
const Unilever = require('../../customers/Unilever');
const Apple = require('../../customers/Apple');
const Ford = require('../../customers/Ford');
const Nike = require('../../customers/Nike');

const expectedBaseProductValues = {
  ClassicAd: 26999,
  StandoutAd: 32299,
  PremiumAd: 39499,
};

describe('work in all expected use cases', () =>{
  describe('Default', () => {
    test('should buy any number of classic ads for regular price', () => {
      const ch = new Checkout();
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of standout ads for regular price', () => {
      const ch = new Checkout();
      const product = 'standout';
      const productBasePrice = expectedBaseProductValues.StandoutAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of premium ads for regular price', () => {
      const ch = new Checkout();
      const product = 'premium';
      const productBasePrice = expectedBaseProductValues.PremiumAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('example scenario given on coding test pdf', () => {
      const ch = new Checkout();
      ch.add('classic');
      ch.add('standout');
      ch.add('premium');
      expect(ch.total()).toEqual(98797);
    });
  });
  describe('Unilever', () => {
    test('should buy less than 3 classic ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Unilever;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should get 3 for 2 discount on classic ads', () => {
      const ch = new Checkout();
      ch.customer = Unilever;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      ch.add(product);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should get 6 for 4 discount on classic ads', () => {
      const ch = new Checkout();
      ch.customer = Unilever;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      expectedTotal = productBasePrice * 4;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of standout ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Unilever;
      const product = 'standout';
      const productBasePrice = expectedBaseProductValues.StandoutAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of premium ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Unilever;
      const product = 'premium';
      const productBasePrice = expectedBaseProductValues.PremiumAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('example scenario given on coding test pdf', () => {
      const ch = new Checkout();
      ch.customer = Unilever;
      ch.add('classic');
      ch.add('classic');
      ch.add('classic');
      ch.add('premium');
      expect(ch.total()).toEqual(93497);
    });
  });
  describe('Apple', () => {
    test('should buy any number of classic ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Apple;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of premium ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Apple;
      const product = 'premium';
      const productBasePrice = expectedBaseProductValues.PremiumAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of standout ads for discounted price', () => {
      const ch = new Checkout();
      ch.customer = Apple;
      const product = 'standout';
      const productAfterDiscount = 29999;
      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productAfterDiscount;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productAfterDiscount * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('example scenario given on coding test pdf', () => {
      const ch = new Checkout();
      ch.customer = Apple;
      ch.add('standout');
      ch.add('standout');
      ch.add('standout');
      ch.add('premium');
      expect(ch.total()).toEqual(129496);
    });
  });
  describe('Nike', () =>{
    test('should buy any number of classic ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Nike;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of standout ads for regular price', () => {
      const ch = new Checkout();
      ch.customer = Nike;
      const product = 'standout';
      const productBasePrice = expectedBaseProductValues.StandoutAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should get discount on premium adds when 4 or more are purchased', () => {
      const ch = new Checkout();
      ch.customer = Nike;
      const product = 'premium';
      const productBasePrice = expectedBaseProductValues.PremiumAd;
      const priceAfterDiscount = 37999;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 3;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = priceAfterDiscount * 4;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = priceAfterDiscount * 5;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('example scenario given on coding test pdf', () => {
      const ch = new Checkout();
      ch.customer = Nike;
      ch.add('premium');
      ch.add('premium');
      ch.add('premium');
      ch.add('premium');
      expect(ch.total()).toEqual(151996);
    });
  });
  describe('Ford', () => {
    test('should get 5 for 4 discount on classic ads', () => {
      const ch = new Checkout();
      ch.customer = Ford;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 3;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 4;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 4;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should get 10 for 8 discount on classic ads', () => {
      const ch = new Checkout();
      ch.customer = Ford;
      const product = 'classic';
      const productBasePrice = expectedBaseProductValues.ClassicAd;

      let expectedTotal = 0;
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      ch.add(product);
      expectedTotal = productBasePrice * 8;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should buy any number of standout ads for discounted price', () => {
      const ch = new Checkout();
      ch.customer = Ford;
      const product = 'standout';
      const productAfterDiscount = 30999;
      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productAfterDiscount;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productAfterDiscount * 2;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should get discount on premium adds when 3 or more are purchased', () => {
      const ch = new Checkout();
      ch.customer = Ford;
      const product = 'premium';
      const productBasePrice = expectedBaseProductValues.PremiumAd;
      const priceAfterDiscount = 38999;

      let expectedTotal = 0;
      ch.add(product);
      expectedTotal = productBasePrice * 1;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = productBasePrice * 2;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = priceAfterDiscount * 3;
      expect(ch.total()).toEqual(expectedTotal);
      ch.add(product);
      expectedTotal = priceAfterDiscount * 4;
      expect(ch.total()).toEqual(expectedTotal);
    });
    test('should be able to buy multiple products at once', () => {
      const ch = new Checkout();
      ch.customer = Ford;
      ch.add('classic');
      ch.add('classic');
      ch.add('classic');
      ch.add('classic');
      ch.add('classic');
      ch.add('standout');
      ch.add('premium');
      ch.add('premium');
      ch.add('premium');
      expect(ch.total()).toEqual(255992);
    });
  });
});
