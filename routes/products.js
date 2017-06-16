const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.use((req, res, next) => {
  res.locals.nav = 'products';
  next();
});

router.get('/', (req, res, next)=> {
  models.Product.getAll()
  .then(products => {
    res.render('products', { products });
  })
});

router.post('/', (req, res, next)=> {
  if (req.body.name) {
    models.Product.addProduct(req.body.name)
  }
  res.redirect('/products');
});

router.delete('/:id', (req, res, next)=> {
  models.Product.deleteProd(req.params.id)
    .then(() => res.redirect('/products'));
});

//-------------not done yet--------------------------------


router.get('/:id', (req, res, next)=> {
  res.render('category', { category: db.getCatByID(req.params.id) });
});

router.post('/:id/product', (req, res, next)=> {
  if (req.body.name) {
    db.addProduct(req.params.id, req.body.name);
  }
  res.redirect(`/categories/${req.params.id}`);
});

router.delete('/:catID/product/:id', (req, res, next)=> {
  db.delProduct(req.params.catID, req.params.id);
  res.redirect(`/categories/${req.params.catID}`);
});

module.exports = router;