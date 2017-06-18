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
    models.Category.addCategory(req.body.name)
  }
  res.redirect('/categories');
});

router.delete('/:id', (req, res, next)=> {
  models.Category.deleteCat(req.params.id)
    .then(() => res.redirect('/categories'));
});

router.get('/:id', (req, res, next)=> {
  models.Category.getCatByID(req.params.id)
  .then(category => {
    console.log('category: ', category)
    res.render('category', { category });
  })
});

router.post('/:id/product', (req, res, next)=> {
  if (req.body.name) {
    db.addProduct(req.params.id, req.body.name);
  }
  res.redirect(`/categories/${req.params.id}`);
});

//------------------not done yet-------------------------------------



router.delete('/:catID/product/:id', (req, res, next)=> {
  db.delProduct(req.params.catID, req.params.id);
  res.redirect(`/categories/${req.params.catID}`);
});

module.exports = router;
