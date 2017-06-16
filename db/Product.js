const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING
  }
};

const Product = db.define('product', defineAttr);

Product.productRecords = function() {
  return this.findAll({
    order: [
      ['name', 'ASC']
    ]
  })
};

// const defineMethods = {
//     classMethods: {
//         productRecords: function() {
//             return this.findAll({
//                 order: [
//                     ['name', 'ASC']
//                 ]
//             })
//         },
//         deleteById: function(userId) { 
//             userId = userId * 1;
//             return this.destroy({
//                 where: {id: userId}
//             })
//         },
//         addProduct: function(name){
//             return this.create({ name })
//         },
//         findById: function(userId) {
//             return this.findOne({
//                 where: {id: userId}
//             })
//         }
//     }
// };

module.exports = Product;
