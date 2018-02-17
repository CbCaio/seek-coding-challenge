exports.up = function(knex) {
  return knex.schema.createTable('customer_shopping_carts', (table) => {
    table.engine('InnoDB');
    table.charset('utf8');
    table.collate('utf8_general_ci');

    table.increments();
    table
      .integer('customer_id')
      .unsigned()
      .notNullable();
    table
      .foreign('customer_id', 'fk_c_s_c_customer_id')
      .references('id')
      .inTable('customers')
      .onUpdate('CASCADE');
    table
      .integer('product_id')
      .unsigned()
      .notNullable();
    table
      .foreign('product_id', 'fk_c_s_c_product_id')
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE');
    table.integer('discount').unsigned();
    table.integer('final_price').unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customer_shopping_carts');
};
