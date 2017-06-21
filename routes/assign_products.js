const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.use((req, res, next) => {
  res.locals.nav = 'assignProducts';
  next();
});

router.get('/', (req, res, next) => {
    res.render('assign_products');
});

router.get('/:id', (req, res, next) => {
  let product;
  models.Product.getProdByID(req.params.id)
    .then((_product) => {
      product = _product;
      return models.CategoryProduct.getAll()
    })
    .then(prodCats => {
      let categories = catInfo(prodCats, product.id);
    })
  res.render('assign_product', { product })
});

function catInfo(prodCats, id) {
  return prodCats.filter(element => element.productId === id)
    .map(element => {
      let catObj = {};
      models.Category.getCatByID(element.categoryId)
        .then(category => {
          console.log('*****************', category)
          catObj.name = category.name;
          catObj.id = category.id;
        })
      console.log('------------------', catObj)
      return catObj;
    })
}

module.exports = router;
