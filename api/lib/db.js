const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://book:ez0A16fUyHgS@192.168.10.100:27017/books',
  { useNewUrlParser: true, useCreateIndex: true },
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

/* Book */

// rating,library_name,timestamp,tags,formats,#formats,authors,author_sort,publisher,isbn,
// identifiers,comments,cover,pubdate,series,series_index,languages,size,title,title_sort,id,uuid
const bookSchema = new mongoose.Schema({
  title: String,
  authors: String,
  tags: String,
  comments: String,
  cover: String,
  // coverUnix: String,
  size: String,
  languages: String,
  uuid: { type: String, unique: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
