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
    include: [ Product ]
  });
};

Category.addCategory = function(name) {
  return this.create({ name });
};

Category.addCatProd = function(id, name){
  this.getCatByID(id)
    .then(category => {

      /*   not sure what to do here!!  
            The browser is looking at a specific category.
            Listed in this category are the products that are associated with the category.

            What I want to do is add a new "associated" product to this list.
      */ 

    });
};

Category.deleteCat = function(id) {
  return this.getCatByID(id)
    .then(record => {
      record.destroy();
    })
};

module.exports = Category;
