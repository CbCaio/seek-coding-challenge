exports.up = function(knex) {
  return knex.batchInsert('customers', [
    {
      name: "apple",
    },
    {
      name: "unilever",
    },
    {
      name: "nike",
    },
    {
      name: "ford",
    },
    {
      name: "default",
    },
  ]);
};

exports.down = function() {
  return Promise.resolve();
};
