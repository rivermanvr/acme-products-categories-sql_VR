const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

router.use((req, res, next) => {
  res.locals.nav = 'assignProducts';
  next();
});

router.get('/', (req, res, next)=> {
    res.render('assign-products');
});

module.exports = router;
