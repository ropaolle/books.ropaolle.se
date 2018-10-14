const bodyParser = require('body-parser');
const express = require('express');

const db = require('./lib/db');
const addBooks = require('./lib/addBooks');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Router
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// http://localhost:3001/api/add (copy to temp folder)
// http://localhost:3001/api/add/upload (upload)
router.get('/add/:upload?', async (req, res) => {
  // console.log(req.params, req.query);
  res.json({ books: await addBooks('./api/books.csv', req.params.upload === 'upload') });
});

router.get('/books', async (req, res) => {
  const books = await db.Book.find({});
  res.json(books);
});

app.use('/api', router);

// Start server
app.listen(port, () => console.info(`Listening on port ${port}`));
