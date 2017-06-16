const db = require( './db' );

const defineAttr = {};

const defineMethod = {};

const CategoryProduct = db.define('categoryproduct', defineAttr, defineMethod);

module.exports = CategoryProduct;
