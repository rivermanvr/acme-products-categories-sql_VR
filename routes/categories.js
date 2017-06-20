const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.use((req, res, next) => {
  res.locals.nav = 'categories'
  next();
});

router.get('/', (req, res, next)=> {
    res.render('categories');
  });

router.post('/', (req, res, next)=> {
  if (req.body.name) {
    models.Category.addCategory(req.body.name)
      .then(() => res.redirect('/categories'))
  } else { res.render('categories') }
});

router.delete('/:id', (req, res, next)=> {
  models.Category.deleteCat(req.params.id)
    .then(() => res.redirect('/categories'));
});

router.get('/:id', (req, res, next)=> {
  models.Category.getCatByID(req.params.id)
  .then(category => {
    res.render('category', { category });
  })
});

router.post('/:id/product', (req, res, next)=> {
  if (req.body.name) {
    models.Category.addCatProd(req.params.id, req.body.name);
  }
  res.redirect(`/categories/${req.params.id}`);
});

router.delete('/:catID/product/:id', (req, res, next)=> {
  models.Product.deleteProd(req.params.id);
  res.redirect(`/categories/${req.params.catID}`);
});

module.exports = router;
