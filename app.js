const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.get('/books', (req, res) => {
  res.render('index');
});

app.get('/books/new', (req, res) => {
  res.render('new_book');
});


app.listen(3000, () => {
  console.log('The app is running on localhost:3000')
});

/*********************
 * End Express code here
 **********************/

const { sequelize, models } = require('./db');
const { Book } = models;

(async () => {
  try {
    // testing connection
    await sequelize.authenticate();
    console.log("Connection succesful!");
    
    // syncing
    console.log('Synchronizing the models with the database...');
    await sequelize.sync({ force: true });

    const bookInstances = await Promise.all([
      Book.create({
        title: 'Ready Player One',
        author: 'Earnest Cline',
        genre: 'Adventure',
        year: 2011
      }),
    ]);
    
    console.log(JSON.stringify(bookInstances, null, 2));

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();