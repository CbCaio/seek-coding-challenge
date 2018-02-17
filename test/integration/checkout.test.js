const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app);
const dbReset = require('./dbReset');

const expectedBaseProductValues = {
  ClassicAd: 26999,
  StandoutAd: 32299,
  PremiumAd: 39499,
};

const expectedProductNames = {
  ClassicAd: 'classic',
  StandoutAd: 'standout',
  PremiumAd: 'premium',
};

async function getShoppingCartTotalForCustomer(customerName){
  const customersResponse = await request.get(`/customers/${customerName}`);
  const totalPrice = customersResponse.body.shoppingCart.totalPrice;

  return totalPrice;
}

async function buyProductAs(customerName, productName) {
  return await request.post('/checkout').send({ customer: customerName, product: productName });
}

async function checkCustomerPriceToPay(customerName, expectedTotal) {
  let totalPriceToPay = await getShoppingCartTotalForCustomer(customerName);
  expect(totalPriceToPay).toEqual(expectedTotal);
}

async function testPurchaseBehavior(
  customerName,
  iterations,
  productToBuyOnEachIteration = [],
  expectedTotalOnEachIteration = [],
  onlyTestLatest = false
) {
  let expectedTotal = 0;
  await checkCustomerPriceToPay(customerName, expectedTotal);
  
  for(let i = 0; i < iterations; i++){
    await buyProductAs(customerName,productToBuyOnEachIteration[i]);

    if(onlyTestLatest) continue;
    expectedTotal = expectedTotalOnEachIteration[i];
    await checkCustomerPriceToPay(customerName, expectedTotal);
  }
}

describe('Default', () => {
  beforeEach(() => {
    return dbReset();
  },100000);

  const customerName = 'default';

  test('should buy any number of classic ads for regular price', async () => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should buy any number of standout ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.StandoutAd;
    const productName = expectedProductNames.StandoutAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should buy any number of premium ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.PremiumAd;
    const productName = expectedProductNames.PremiumAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('example scenario given on coding test pdf', async() => {
    const classic = expectedProductNames.ClassicAd;
    const standout = expectedProductNames.StandoutAd;
    const premium = expectedProductNames.PremiumAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      3,
      [classic, standout, premium],
      [1,2,98797],
      onlyTestLatestEnabled
    );
  });
});

describe('Unilever', () => {
  beforeEach(() => {
    return dbReset();
  },100000);

  const customerName = 'unilever';

  test('should buy 2 or less classic ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice * 2)]
    );
  });
  test('should get 3 for 2 discount on classic ads', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    return await testPurchaseBehavior(
      customerName,
      3,
      [productName, productName, productName],
      [productBasePrice, (productBasePrice * 2), (productBasePrice * 2)]
    );
  });
  test('should get 6 for 4 discount on classic ads', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      6,
      [productName, productName, productName,productName, productName, productName],
      [1,2,3,4,5,(productBasePrice*4)],
      onlyTestLatestEnabled
    );
  });
  test('should buy any number of standout ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.StandoutAd;
    const productName = expectedProductNames.StandoutAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should buy any number of premium ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.PremiumAd;
    const productName = expectedProductNames.PremiumAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('example scenario given on coding test pdf', async() => {
    const classic = expectedProductNames.ClassicAd;
    const premium = expectedProductNames.PremiumAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      4,
      [classic, classic, classic, premium],
      [1,2,3,93497],
      onlyTestLatestEnabled
    );
  });
});

describe('Apple', () => {
  beforeEach(() => {
    return dbReset();
  },100000);

  const customerName = 'apple';

  test('should buy any number of classic ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should buy any number of premium ads for regular price', async () => {
    const productBasePrice = expectedBaseProductValues.PremiumAd;
    const productName = expectedProductNames.PremiumAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should buy any number of standout ads for discounted price', async() => {
    const productDiscountedPrice = 29999;
    const productName = expectedProductNames.StandoutAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productDiscountedPrice, (productDiscountedPrice*2)]
    );
  });
  test('example scenario given on coding test pdf', async() => {
    const standout = expectedProductNames.StandoutAd;
    const premium = expectedProductNames.PremiumAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      2,
      [standout, standout, standout, premium],
      [1,2,3,129496],
      onlyTestLatestEnabled
    );
  });
});

describe('Nike', () =>{
  beforeEach(() => {
    return dbReset();
  },100000);

  const customerName = 'nike';
  test('should buy any number of classic ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should buy any number of standout ads for regular price', async() => {
    const productBasePrice = expectedBaseProductValues.StandoutAd;
    const productName = expectedProductNames.StandoutAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productBasePrice, (productBasePrice*2)]
    );
  });
  test('should get discount on premium adds when 4 or more are purchased', async() => {
    const productBasePrice = expectedBaseProductValues.PremiumAd;
    const priceAfterDiscount = 37999;
    const productName = expectedProductNames.PremiumAd;
    return await testPurchaseBehavior(
      customerName,
      5,
      [productName, productName, productName, productName,productName],
      [productBasePrice, (productBasePrice*2), (productBasePrice*3), (priceAfterDiscount*4),
        (priceAfterDiscount*5)]
    );
  });
  test('example scenario given on coding test pdf', async() => {
    const premium = expectedProductNames.PremiumAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      5,
      [premium,premium,premium,premium,premium],
      [1,2,3,4,151996],
      onlyTestLatestEnabled
    );
  });
});

describe('Ford', () => {
  beforeEach(() => {
    return dbReset();
  },100000);

  const customerName = 'ford';

  test('should get 5 for 4 discount on classic ads', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    return await testPurchaseBehavior(
      customerName,
      5,
      [productName, productName, productName,productName,productName],
      [productBasePrice, (productBasePrice * 2), (productBasePrice * 3), (productBasePrice * 4)
      , (productBasePrice * 4)]
    );
  });
  test('should get 10 for 8 discount on classic ads', async() => {
    const productBasePrice = expectedBaseProductValues.ClassicAd;
    const productName = expectedProductNames.ClassicAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      10,
      [productName, productName, productName,productName,productName,
        productName, productName, productName,productName,productName],
      [1,2,3,4,5,6,7,8, 9,(productBasePrice * 8)],
      onlyTestLatestEnabled
    );
  });
  test('should buy any number of standout ads for discounted price', async() => {
    const productDiscountedPrice = 30999;
    const productName = expectedProductNames.StandoutAd;
    return await testPurchaseBehavior(
      customerName,
      2,
      [productName, productName],
      [productDiscountedPrice, (productDiscountedPrice*2)]
    );
  });
  test('should get discount on premium adds when 3 or more are purchased', async() => {
    const productBasePrice = expectedBaseProductValues.PremiumAd;
    const priceAfterDiscount = 38999;
    const productName = expectedProductNames.PremiumAd;
    return await testPurchaseBehavior(
      customerName,
      4,
      [productName, productName, productName, productName],
      [productBasePrice, (productBasePrice*2), (priceAfterDiscount*3), (priceAfterDiscount*4)]
    );
  });
  test('should be able to buy multiple products at once', async() => {
    const classic = expectedProductNames.ClassicAd;
    const standout = expectedProductNames.StandoutAd;
    const premium = expectedProductNames.PremiumAd;
    const onlyTestLatestEnabled = true;
    return await testPurchaseBehavior(
      customerName,
      9,
      [classic, classic, classic, classic, classic, standout, premium,premium,premium],
      [1,2,3,4,151996],
      onlyTestLatestEnabled,
      255992
    );
  });
});
