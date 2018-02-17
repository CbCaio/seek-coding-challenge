
exports.up = function(knex) {
  return Promise.all([
    knex.schema.raw("ALTER TABLE `discount_rules` CHANGE COLUMN `rule_configuration` `rule_configuration` JSON NOT NULL"),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.raw("ALTER TABLE `discount_rules` CHANGE COLUMN `rule_configuration` `rule_configuration` TEXT NULL"),
  ]);
};
