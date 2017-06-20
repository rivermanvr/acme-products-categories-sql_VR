const db = require( './db' );
const Product = require( './Product' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING
  }
};

const defineOptions = {};

const Category = db.define('category', defineAttr, defineOptions);

Category.getAll = function() {
  return this.findAll({
    order: ['name']
  });
};

Category.getCatByID = function(id) {
  return this.findById(id, {
    include: [{ model: Product }]
  });
};

Category.addCategory = function(name) {
  return this.create({ name });
};

Category.addCatProd = function(id, name){
  let product;
  Product.addProduct(name)
    .then(_product => {
      product = _product;
      return this.getCatByID(id)
    })
    .then(category => category.addProduct(product.id));
};

Category.deleteCat = function(id) {
  return this.findOne({ where: { id } })
    .then(record => {
      return record.destroy();
    })
};

Category.deleteProd = function(id) {
  return this.findOne({ where: { id } })
    .then(record => {
      return record.destroy();
    })
};

module.exports = Category;
