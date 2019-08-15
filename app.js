const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');


/**
 * ROUTES
 */
const mainRoutes = require('./routes');
app.use(mainRoutes);


/**
 * ERROR HANDLING
 */
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  if (err.status === 404) {
    res.render('page_not_found', { err, title: "Error" });
  } else {
    res.render('error', { err, title: "Error" });
  }
  console.log("ERROR: An unexpected error has occurred. Status Code: ", err.status || 500);
});

/**
 * Serving App to localhost:3000/
 */
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
        year: 2011,
      }),
    ]);
    
    console.log(JSON.stringify(bookInstances, null, 2));

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();