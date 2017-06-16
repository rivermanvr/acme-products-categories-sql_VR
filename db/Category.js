const db = require( './db' );

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
  return this.findById(id);
};

Category.addCategory = function(name) {
  return this.create({ name });
};

Category.deleteCat = function(id) {
  return this.getCatByID(id)
    .then(record => {
      record.destroy();
    })
};

module.exports = Category;
