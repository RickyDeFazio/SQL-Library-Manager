const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');


// Routes
const indexRoutes = require('./routes');
const bookRoutes = require('./routes/books');
app.use(indexRoutes);
app.use(bookRoutes);


// Error Handling
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('page_not_found', err);
  console.log("ERROR: Page Not Found. Status Code: ", err.status);
});


app.listen(3000, () => {
  console.log('The app is running on localhost:3000')
});

/*********************
 * End of Express code here
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