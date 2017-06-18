const db = require( './db' );
const Category = require( './Category' );
const Product = require( './Product' );
const CategoryProduct = require( './CategoryProduct' );

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

const sync = () => db.sync({ force: true });

const addCategories = () => {
  const categories = [
    'Music-Books'
  ];
  const promiseArr = categories.map(name => Category.create({ name }));
  return Promise.all(promiseArr);
};

const addProducts = () => {
  const products = [
    'Gibson Guitar',
    'PRS Guitar',
    'Tennis Racket'
  ];
  const promiseArr = products.map(name => Product.create({ name }));
  return Promise.all(promiseArr);
};

const seed = () => sync()
    .then(() => addCategories())
    .then(() => addProducts())
    .then(() => {
      //testing aspects of Sequelize.
      const promiseArr = [];

      //--------------------------------------
      // Adds a product, and categories simultaneously
      // creates the linkage between these records in the join table.
      //both records are newly created

      // promiseArr[0] = Product.create({
      //   name: 'Vin',
      //   categories: [
      //     { name: 'Homo Sapien' },
      //     { name: 'Male' }
      //   ]
      // }, {
      //   include: [ Category ]
      // })
      //--------------------------------------

      promiseArr[0] = Product.create({ name: 'skis', categories: [ { name: 'Outdoors' }, { name: 'Sports' }] }, { include: [ Category ] });

      promiseArr[1] = Product.create({ name: 'Martin Guitar', categories: [{ name: 'Music-Instruments' }] }, { include: [ Category ] });

      // promiseArr[2] = CategoryProduct.create({ categoryId: 4, productId: 1 });

      // promiseArr[3] = CategoryProduct.create({ categoryId: 4, productId: 2 });

      // promiseArr[4] = CategoryProduct.create({ categoryId: 2, productId: 3 });

      return Promise.all(promiseArr);
    });

module.exports = { seed, sync, models: { Category, Product } };
