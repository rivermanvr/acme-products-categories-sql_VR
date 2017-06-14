const express = require( 'express' );
const app = express();
const swig = require( 'swig' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const router = require( './routes/categories' );
const db = require( './db' );

const port = process.env.PORT || 3000;

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  let categories = db.get();
  res.locals.categories = categories;
  res.locals.catLen = categories.length
  next();
})

app.use('/categories', router);

app.get('/', (req, res, next)=> {
  res.render('index', { nav: 'home' });
});

app.listen(port, () => { console.log(`listening on port ${port}`) });
