exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.engine('InnoDB');
    table.charset('utf8');
    table.collate('utf8_general_ci');

    table.increments();
    table.string('name').unique();
    table.integer('base_price')
      .unsigned()
      .notNullable();
    table.text('features');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products');
};
