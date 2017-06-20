const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.use((req, res, next) => {
  res.locals.nav = 'products';
  next();
});

router.get('/', (req, res, next)=> {
    res.render('products');
});

router.post('/', (req, res, next)=> {
  if (req.body.name) {
    models.Product.addProduct(req.body.name);
    res.redirect('/products');
  } else { res.render('products') }
});

router.delete('/:id', (req, res, next)=> {
  models.Product.deleteProd(req.params.id)
    .then(() => res.redirect('/products'));
});

module.exports = router;
