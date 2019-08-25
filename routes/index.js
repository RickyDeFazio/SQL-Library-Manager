const express = require('express');
const router = express.Router();

const { models } = require('../db');
const { Book } = models;


function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

// Redirects user to main books page
router.get('/', (req, res) => {
  res.redirect('/books');
});

// Shows the full list of books
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [ [ "title", "ASC" ] ]
  });
  res.render('index', { books, title: "Books" });  
}));


// Shows the create new book form
router.get('/books/new', (req, res) => {
  res.render('new-book', { title: "New Book" });
});

// Posts a new book to the database
router.post('/books/new', async (req, res) => {
  try {
    await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error(error.message);
      return res.render('formError-newBook', { title: "Form Error" });
    }
  }
});

// Shows book detail form
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { 
    title: "Book Details",
    book,
  });
}));

// Updates book info in the database
router.post('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);

    res.redirect('/books/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error(error.message);
      const book = await Book.findByPk(req.params.id);
      return res.render('formError-updateBook', { title: "Form Error", book });
    }
  }
});

// Deletes a book.
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const bookToDelete = await Book.findByPk(req.params.id);
  await bookToDelete.destroy();
  res.redirect('/books');
}));


module.exports = router;