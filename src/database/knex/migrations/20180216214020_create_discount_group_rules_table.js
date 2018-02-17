exports.up = function(knex) {
  return knex.schema.createTable('discount_group_rules', (table) => {
    table.engine('InnoDB');
    table.charset('utf8');
    table.collate('utf8_general_ci');

    table.increments();
    table
      .integer('discount_group_id')
      .unsigned()
      .notNullable();
    table
      .foreign('discount_group_id', 'fk_d_g_r_discount_group_id')
      .references('id')
      .inTable('discount_groups')
      .onUpdate('CASCADE');
    table
      .integer('discount_rule_id')
      .unsigned()
      .notNullable();
    table
      .foreign('discount_rule_id', 'fk_d_g_r_discount_rule_id')
      .references('id')
      .inTable('discount_rules')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {  
  return knex.schema.dropTableIfExists('discount_group_rules');
};
