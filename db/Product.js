const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
};

const defineOptions = {};

const Product = db.define('product', defineAttr, defineOptions);

Product.getAll = function() {
  return this.findAll({
    order: ['name']
  })
};

Product.getProdByID = function(id) {
  id = id * 1;
  return this.findById(id);
};

Product.addProduct = function(name){
    return this.create({ name });
};

Product.deleteProd = function(id) {
  id = id * 1;
  return this.findOne({ where: { id } })
    .then(record => {
      record.destroy();
    })
};

module.exports = Product;
