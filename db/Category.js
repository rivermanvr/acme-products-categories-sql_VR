const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING
  }
};

const Category = db.define('category', defineAttr);

Category.getAll = function() {
  return this.findAll({
    // order: ['name', ASC]
  })
};

module.exports = Category;
