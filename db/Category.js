const db = require( './db' );
const Product = require( './Product' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      caseCheck: function(nameValue) {
        let first = nameValue.charAt(0);
        if (first !== first.toUpperCase()) {
          throw new Error('Category names should be capitalized');
        }
      }
    }
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
  return this.destroy({ where: { id } })
    .then(() => { console.log(`Category deleted, id: ${id}`) })
};

module.exports = Category;
