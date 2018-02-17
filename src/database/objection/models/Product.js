const { Model } = require('objection');

module.exports = class Product extends Model {
  static get tableName() {
    return 'products';
  }
};
