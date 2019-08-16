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
    res.render('page-not-found', { err, title: "Error" });
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
    console.log("Testing Connection...")
    await sequelize.authenticate();
    console.log("Connection succesful!");
    
    // syncing
    console.log('Synchronizing the models with the database...');
    await sequelize.sync({ force: true });

    const bookInstances = await Promise.all([
      Book.create({
        title: 'Ready Player One',
        author: 'Earnest Cline',
        genre: 'Science Fiction',
        year: 2011,
      }),
      Book.create({
        title: 'The Shining',
        author: 'Stephen King',
        genre: 'Horror',
        year: 1977,
      }),
      Book.create({
        title: 'The Truth',
        author: 'Neil Strauss',
        genre: 'Autobiography',
        year: 2015,
      }),
      Book.create({
        title: 'Supermarket',
        author: 'Bobby Hall',
        genre: 'Fiction',
        year: 2019,
      }),
      Book.create({
        title: 'Smartcuts: How Hackers, Innovators, and Icons Accelerate Success',
        author: 'Shane Snow',
        genre: 'Business',
        year: 2014,
      }),
      Book.create({
        title: 'The Tipping Point: How Little Things Can Make a Big Difference',
        author: 'Malcolm Gladwell',
        genre: 'Business',
        year: 2002,
      }),
      Book.create({
        title: 'Rich Dad, Poor Dad',
        author: 'Jordan Belfort',
        genre: 'Business',
        year: 2017,
      }),
      Book.create({
        title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        author: 'James Clear',
        genre: 'Psychology',
        year: 2018,
      }),
      Book.create({
        title: '12 Rules for Life: An Antidote Chaos',
        author: 'Jordan B. Peterson',
        genre: 'Psychology',
        year: 2018,
      }),
      Book.create({
        title: 'Essentialism: The Disciplined Pursuit of Less',
        author: 'Greg McKeown',
        genre: 'Self-Development',
        year: 2014,
      }),
      Book.create({
        title: 'Flow: The Psychology of Optimal Experience',
        author: 'Mihaly Csikszentmihalyi',
        genre: 'Psychology',
        year: 1990,
      }),
      Book.create({
        title: 'Spark: The Revolutionary New Science of Exercise and the Brain',
        author: 'John J. Ratey',
        genre: 'Health',
        year: 2008,
      }),
      Book.create({
        title: 'Algorithms to Live By: The Computer Science of Human Decisions',
        author: 'Brian Christian',
        genre: 'Science',
        year: 2016,
      }),
      Book.create({
        title: 'Deep Work: Rules for Focused Success in a Distracted World',
        author: 'Cal Newport',
        genre: 'Self-Development',
        year: 2016,
      }),
      Book.create({
        title: 'The Righteous Mind: Why Good People Are Divided by Politics and Religion',
        author: 'Jonathan Haidt',
        genre: 'Psychology',
        year: 2012,
      }),
    ]);

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();