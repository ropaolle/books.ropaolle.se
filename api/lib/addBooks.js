const neatCsv = require('neat-csv');
const fs = require('fs-extra');
const upath = require('upath');
const cloudinary = require('cloudinary');
// const compact = require('lodash/compact');

cloudinary.config({
  cloud_name: 'dw2asxnil',
  api_key: '279717298199871',
  api_secret: 'YsgcPXFJMXrLPmuqcHUMl_bREFg',
});

const db = require('./db');

let progress;

function updateProgress() {
  progress -= 1;
  process.stdout.write(`${progress ? '.' : ' done!\n'}`);
}

function copyImage(book) {
  const coverUnix = upath.toUnix(book.cover).replace('C:', '/mnt/c');
  const coverUnixDest = `/mnt/c/SAVE/GitHub/books.ropaolle.se/api/images/${book.uuid}.jpg`;
  fs.copyFile(coverUnix, coverUnixDest, (err) => {
    if (err) throw err;
    updateProgress();
    // console.info('Image copied:', upath.parse(coverUnixDest).base);
  });
}

function uploadImage(book) {
  const coverUnix = upath.toUnix(book.cover).replace('C:', '/mnt/c');
  const options = { folder: 'books', public_id: book.uuid, overwrite: false };
  cloudinary.v2.uploader.upload(coverUnix, options,
    (err/* , result */) => {
      if (err) throw err;
      updateProgress();
      // return console.info('Image uploaded', result.public_id);
    });
}

/* { n: 1,
  nModified: 0,
  upserted: [ { index: 0, _id: 5bc32ac1139006c0f83740cb } ],
  ok: 1 } */

async function addBooksToDb(books, upload) {
  const updates = books.map(book => db.Book
    .updateOne({ uuid: book.uuid }, book, { upsert: true })
    .then((res) => {
      let action;
      if (res.upserted) {
        if (upload) {
          uploadImage(book);
          action = { id: res.upserted[0]._id, action: 'uploaded' };
        } else {
          copyImage(book);
          action = { id: res.upserted[0]._id, action: 'copied' };
        }
      }
      return action;
    })
    .catch(console.error));

  return Promise.all(updates);
}

async function parseCsv(file, upload) {
  try {
    const csvRaw = await fs.readFile(file);
    const books = await neatCsv(csvRaw);
    progress = books.length;
    process.stdout.write(`\n${upload ? 'Uploading' : 'Copying'} ${progress} image(s): `);
    await addBooksToDb(books, upload);

    return books.length;
  } catch (err) {
    console.error(err);
  }

  return 0;
}

module.exports = parseCsv;
