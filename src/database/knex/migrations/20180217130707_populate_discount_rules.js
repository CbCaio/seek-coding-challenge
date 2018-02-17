exports.up = async function(knex) {
  await knex.batchInsert('discount_rules', [
    {
      id: 1,
      rule_identifier: "BuyXGetY",
      rule_configuration: `{"productXId": 1, "productYId": 1, "totalProductYForFree": 1, "totalProductXToEnable": 3}`,
    },
    {
      id: 2,
      rule_identifier: "BuyXGetY",
      rule_configuration: `{"productXId": 1, "productYId": 1, "totalProductYForFree": 1, "totalProductXToEnable": 5}`,
    },
    {
      id: 3,
      rule_identifier: "DiscountOnProduct",
      rule_configuration: `{"productId": 2, "finalPrice": 29999, "minimumProductsToEnable": 1}`,
    },
    {
      id: 4,
      rule_identifier: "DiscountOnProduct",
      rule_configuration: `{"productId": 3, "finalPrice": 37999, "minimumProductsToEnable": 4}`,
    },
    {
      id: 5,
      rule_identifier: "DiscountOnProduct",
      rule_configuration: `{"productId": 2, "finalPrice": 30999, "minimumProductsToEnable": 1}`,
    },
    {
      id: 6,
      rule_identifier: "DiscountOnProduct",
      rule_configuration: `{"productId": 3, "finalPrice": 38999, "minimumProductsToEnable": 3}`,
    },
  ]);

  await knex.batchInsert('discount_groups', [
    {
      id: 1,
      name: "apple_exclusive",
    },
    {
      id: 2,
      name: "unilever_exclusive",
    },
    {
      id: 3,
      name: "nike_exclusive",
    },
    {
      id: 4,
      name: "ford_exclusive",
    },
  ]);

  await knex.batchInsert('discount_group_rules',[
    {
      discount_group_id: 2,
      discount_rule_id: 1,
    },
    {
      discount_group_id:  1,
      discount_rule_id: 3,
    },
    {
      discount_group_id:  3,
      discount_rule_id: 4,
    },
    {
      discount_group_id:  4,
      discount_rule_id: 2,
    },
    {
      discount_group_id:  4,
      discount_rule_id: 5,
    },
    {
      discount_group_id:  4,
      discount_rule_id: 6,
    },
  ]);

  await knex('customers').update({
    discount_group_id: 1,
  }).where('name', 'apple');

  await knex('customers').update({
    discount_group_id: 2,
  }).where('name', 'unilever');
  
  await knex('customers').update({
    discount_group_id: 3,
  }).where('name', 'nike');

  await knex('customers').update({
    discount_group_id: 4,
  }).where('name', 'ford');

  return;
};

exports.down = function() {
  return Promise.resolve();
};
