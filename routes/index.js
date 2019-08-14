const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/books');
});

router.get('/books', (req, res) => {
  res.render('index', { variableName: "variable content, use interpolation to add variable to static text" });
});

router.get('/books/new', (req, res) => {
  res.render('new_book');
});

router.post('/books/new', (req, res) => {
  res.render('new_book');
});

module.exports = router;