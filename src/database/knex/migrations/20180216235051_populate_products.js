exports.up = function(knex) {
  return knex.batchInsert('products', [
    {
      name: "classic",
      base_price: 26999,
      features: "BASIC_ADVERTISEMENT_LEVEL",
    },
    {
      name: "standout",
      base_price: 32299,
      features: "BASIC_ADVERTISEMENT_LEVEL,ALLOWS_COMPANY_LOGO,ALLOWS_LONGER_PRESENTATION_TEXT",
    },
    {
      name: "premium",
      base_price: 32299,
      features: "BASIC_ADVERTISEMENT_LEVEL, ALLOWS_COMPANY_LOGO, ALLOWS_LONGER_PRESENTATION_TEXT, HIGHER_VISIBILITY_TOP",
    }
  ]);
};

exports.down = function() {
  return Promise.resolve();
};
