exports.up = function(knex) {
  return knex.schema.createTable('discount_rules', (table) => {
    table.engine('InnoDB');
    table.charset('utf8');
    table.collate('utf8_general_ci');

    table.increments();
    table.string('rule_identifier').notNullable();
    table.text('rule_configuration').notNullable();
  });
};

exports.down = function(knex) {  
  return knex.schema.dropTableIfExists('discount_rules');
};
