const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING
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
  return this.findById(id);
};

Product.addProduct = function(name){
    return this.create({ name }).catch(err => console.log(err));
};

Product.deleteProd = function(id) {
  return this.findOne({ where: { id } })
    .then(record => {
      record.destroy();
    })
};

module.exports = Product;
