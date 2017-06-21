const express = require( 'express' );
const app = express();
const swig = require( 'swig' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const routerCategories = require( './routes/categories' );
const routerProducts = require( './routes/products' );
const routerAssignProducts = require( './routes/assign_products' );
const db = require( './db' );
const models = db.models;

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
    models.Category.getAll()
      .then(categories => {
        res.locals.catLen = categories.length;
        res.locals.categories = categories;
      })
      .then(() => models.Product.getAll())
      .then(products => {
        res.locals.prodLen = products.length;
        res.locals.products = products;
      })
      .done(() => next());
});

app.use('/assign_products', routerAssignProducts);
app.use('/categories', routerCategories);
app.use('/products', routerProducts);

app.get('/', (req, res, next) => {
  res.render('index', { nav: 'home' });
});

module.exports = app;
