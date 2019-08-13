const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');

// Routes Below
app.get('/', (req, res) => {
  res.redirect('/books');
});


app.get('/books', (req, res) => {
  res.render('index', { variableName: "variable content, use interpolation to add variable to static text" });
});


app.get('/books/new', (req, res) => {
  res.render('new_book');
});

// Tester Route Below
app.get('/test', (req, res) => {
  res.render('page_not_found');
});
// Delete Above Code 

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