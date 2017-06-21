const db = require( './db' );
const Product = require( './Product' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
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
  id = id * 1;
  return this.findById(id, {
    include: [{ model: Product }]
  });
};

Category.addCategory = function(name) {
  return this.create({ name });
};

Category.addCatProd = function(id, name){
  id = id * 1;
  let product;
  // first add the product to the Product table
  Product.addProduct(name)
  // then add the association (category & product)
    .then(_product => {
      product = _product;
      return this.findById(id)
    })
    .then(category => {
      return category.addProduct(product.id)
    });
};

Category.deleteCat = function(id) {
  id = id * 1;
  return this.findOne({ where: { id } })
    .then(record => {
      return record.destroy();
    })
};

module.exports = Category;
