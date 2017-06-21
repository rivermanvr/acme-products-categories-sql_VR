const db = require( './db' );

const CategoryProduct = db.define('categoryproduct');

CategoryProduct.getAll = function() {
  return this.findAll({
  })
};

module.exports = CategoryProduct;
