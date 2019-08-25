// Initially populates DB with books
const populate = require('./populate');
populate();


const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static('public'));

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
    res.render('page-not-found', { title: "Error" });
  } else {
    err.status = 500;
    res.render('error', { title: "Error" });
  }
  console.log("ERROR: An unexpected error has occurred. Status Code: ", err.status || 500);
});

/**
 * Serving App to localhost:3000/
 */
app.listen(3000, () => {
  console.log('The app is running on localhost:3000')
});



