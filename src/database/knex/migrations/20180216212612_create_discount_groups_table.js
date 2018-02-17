exports.up = function(knex) {
  return knex.schema.createTable('discount_groups', (table) => {
    table.engine('InnoDB');
    table.charset('utf8');
    table.collate('utf8_general_ci');

    table.increments();
    table.string('name').unique();
  });
};

exports.down = function(knex) {  
  return knex.schema.dropTableIfExists('discount_groups');
};
