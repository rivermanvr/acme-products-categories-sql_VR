const db = require( './db' );

const defineAttr = {};

const defineOptions = {};

const CategoryProduct = db.define('categoryproduct', defineAttr, defineOptions);

module.exports = CategoryProduct;
