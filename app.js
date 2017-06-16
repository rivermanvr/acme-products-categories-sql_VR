const express = require( 'express' );
const app = express();
const swig = require( 'swig' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const router = require( './routes/categories' );
const db = require( './db' );
const models = db.models;

const port = process.env.PORT || 3000;

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
    })
    .done(() => next());
})

app.use('/categories', router);

app.get('/', (req, res, next)=> {
  res.render('index', { nav: 'home' });
});

module.exports = app;
