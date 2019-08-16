const express = require('express');
const router = express.Router();

const { sequelize, models } = require('../db');
const { Book } = models;

// Redirects user to main books page
router.get('/', (req, res) => {
  res.redirect('/books');
});

// Shows the full list of books
router.get('/books', async (req, res) => {
  const books = await Book.findAll({
    order: [ [ 'title', 'ASC' ] ],
  });
  res.render('index', { books, title: "Books" });
});

// Shows the create new book form
router.get('/books/new', (req, res) => {
  res.render('new-book', { title: "New Book" });
});

// Posts a new book to the database
router.post('/books/new', (req, res) => {
  res.redirect('/books');
});

// Shows book detail form
router.get('/books/:id', (req, res) => {
  res.render('new-book', { title: "Book Details" });
});

// Updates book info in the database
router.post('/books/:id', (req, res) => {
  res.redirect('/books/:id/' + book.id);
});

// Deletes a book.
// router.post('/books/:id/delete', (req, res) = {
//   // how to handle this???
// });


module.exports = router;