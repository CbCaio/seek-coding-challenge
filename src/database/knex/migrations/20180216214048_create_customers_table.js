exports.up = function(knex) {
  return knex.schema.createTable('customers', (table) => {
    table.engine('InnoDB');
    table.charset('utf8');
    table.collate('utf8_general_ci');

    table.increments();
    table.string('name').unique();
    table
      .integer('discount_group_id')
      .unsigned();
    table
      .foreign('discount_group_id', 'fk_customers_discount_group_id')
      .references('id')
      .inTable('discount_groups')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customers');
};
