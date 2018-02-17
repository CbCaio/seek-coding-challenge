# Seek Code Challenge

This repository holds a project created as part of a code challenge test for SEEK.

## How it works

The solution proposed consists in using the following 5 entities: 

- customers: can be inside a pricing rule group and can have products in the shopping cart
- products: holds the base price and its features list, is linked to the items inside a shopping cart, but don't have its price altered
- pricing rules: compose of two parts, the rule identifier and the rule configuration, is used to compose a pricing rule group and to define how the rules will be applied
- pricing rule groups: its a set of pricing rules that can be attached to any number of users
- shopping cart: holds the products being bought by an user, any given discount given to a product and the final price per item

Basically, a customer can add products to the shopping cart one by one by its name through the route `POST /checkout` and them retrieve the shopping cart in `GET /customers/:customerName`. The set of rules per customer is set in the database, allowing it to be changed at any time without altering code. However, if a new kind of pricing rule is created, it needs to first be available in the `PricingRulesFactory`, which means, some code needs to be added.

The calculation is done by the `Checkout`, first all data from the database in normalized into a set of default models (`Customer`, `Product`, `Pricing Rule`) and them passed to the checkout methods. Later on, the new information is persisted back into the database.  

### Prerequisites

1. Node v8.9.3 and MYSQL 

OR

2. docker with docker-compose installed

### Installing

1. https://nodejs.org/en/

2. 
  - https://docs.docker.com/install/
  - https://docs.docker.com/compose/install/

## Running the tests

I ended up only adding integration tests for this application, but I left unit tests structure in place to anyone to start doing it(its a test, no one will do it, I know). 

The test structure runs a mysql instance and populate it on every suite of tests (to clean database and renew structure). Tests cover all basic purchase behavior and the example scenarios listed on the test pdf. 

#### Case 1:
- npm run test:integration

#### Case 2:
- docker-compose run --rm microservice npm run test:integration

## Running the application

#### Case 1:

- clone project and install dependencies with `npm run install` (if you have nvm, issue `nvm use` before to set appropriate node version)
- set your database config in `src/config/databaseConfig`and set it up with command `npm run migration:run` 
- start application using command `npm run start`
- check on your browser the contracts page for the API on `localhost:9000/api-docs`
- send GET and POST requests to the routes displayed on the contracts
- to add a product to the checkout, issue `POST /checkout` with a payload like
  ```
  {
    customer: 'apple',
    product: 'classic'
  }
  ```
- to see what products are in each customer's shopping cart, access `GET /customers/:customerName`


#### Case 2:

With docker, you can run the application using:
- docker-compose up -d microservice (will map to port 9000)
and to shut it down
- docker-compose down

## Others

- Used eslint(`.eslintrc`) for helping me with code quality and code standards
- Used nvm(`.nvmrc`) for helping whoever needs to run the code with same node version (really helps to avoid issues)

## Author

* **Caio Ceccon Bolognani** - *Seek Code Challenge* - [CbCaio](https://github.com/CbCaio)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Maybe its too complex for such a simple task, but I tried to imagine it as an extendible solution, even used model normalization to avoid applying logic on top of  information coming directly from database, making it easy to switch data sources.
* The folder structure might seem a little complex at start, but I've been using this structure for some time and I'm liking it very much, helps with organization and in consequence boosts development speed a bit.
* Not used loggers, thought it was too much
