const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.use((req, res, next) => {
  res.locals.nav = 'categories';
  next();
});

router.get('/', (req, res, next)=> {
  models.Category.getAll()
  .then(categories => {
    res.render('categories', { categories });
  })
});

router.post('/', (req, res, next)=> {
  if (req.body.name) {
    db.addCat(req.body.name);
  }
  res.redirect('/categories');
});

router.delete('/:id', (req, res, next)=> {
  db.delCat(req.params.id);
  res.redirect('/categories');
});

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
