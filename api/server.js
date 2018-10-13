const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

mongoose.connect(
  'mongodb://book:ez0A16fUyHgS@192.168.10.100:27017/books',
  { useNewUrlParser: true, useCreateIndex: true },
);
const db = mongoose.connection;

// rating,library_name,timestamp,tags,formats,#formats,authors,author_sort,publisher,isbn,
// identifiers,comments,cover,pubdate,series,series_index,languages,size,title,title_sort,id,uuid
const bookSchema = new mongoose.Schema({
  title: String,
  authors: String,
  tags: String,
  comments: String,
  cover: String,
  coverUnix: String,
  size: String,
  languages: String,
  uuid: { type: String, unique: true },
});

const Book = mongoose.model('Book', bookSchema);

db.on('error', console.error.bind(console, 'connection error:'));

// db.once("open", () => {
//   console.info("DB opened!");
//   const fluffy = new Book({ name: "Silence", author: "Lenan Nyman" });
//   fluffy.save(function(err, fluffy) {
//     if (err) return console.error(err);
//   });
// });

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

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/books', async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

app.use('/api', router);

// Start server
app.listen(port, () => console.info(`Listening on port ${port}`));

// Parser
const parse = require('csv-parser');

const parser = parse({ separator: ',' });
const fs = require('fs');
const upath = require('upath');

const results = [];

const readStream = fs.createReadStream('books.csv');
// readStream.pipe(process.stdout);

readStream
  .pipe(parser)
  .on('data', (data) => {
    const coverUnix = upath.toUnix(data.cover).replace('C:', '/mnt/c');
    const coverUnixDest = `/mnt/c/SAVE/GitHub/books.ropaolle.se/api/images/${data.uuid}.jpg`;
    fs.copyFile(coverUnix, coverUnixDest, (err) => {
      if (err) throw err;
      // console.log('source.txt was copied to destination.txt');
    });

    results.push(data);
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', async () => {
    await Book.insertMany(results, { ordered: false })
      .then(res => console.info('Books added:', res.length))
      .catch((err) => {
        if (err.code !== 11000) {
          console.error(err);
        } else {
          console.info('Books added: E11000 duplicate detected!');
        }
      });
  });
