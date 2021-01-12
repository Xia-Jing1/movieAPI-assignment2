import session from 'express-session';
import passport from './authenticate';
import {loadUsers, loadMovies, loadUpcomingMovies, loadPopularMovies, loadTopratedMovies, loadLatestMovies, loadNowplayingMovies, loadActors} from './seedData';
import './db';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import upcomingRouter from './api/upcomingMovies';
import popularRouter from './api/popularMovies';
import topratedRouter from './api/topratedMovies';
import latestRouter from './api/latestMovies';
import nowplayingRouter from './api/nowplayingMovies';
import actorsRouter from './api/actors';

import bodyParser from 'body-parser';
import usersRouter from './api/users';
import genresRouter from './api/genres';
import loglevel from 'loglevel';

if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
 } else {
  loglevel.setLevel('info')
 }

dotenv.config();

const app = express();

const port = process.env.PORT;

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

// initialise passport​
app.use(passport.initialize());
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));
// Add passport.authenticate(..)  to middleware stack for protected routes​
app.use('/api/movies',  moviesRouter);
app.use('/api/upcoming',upcomingRouter);
app.use('/api/popular',popularRouter);
app.use('/api/toprated',topratedRouter);
app.use('/api/latest',latestRouter);
app.use('/api/nowplaying',nowplayingRouter);
app.use('/api/actors',actorsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);

app.use(errHandler);

const server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});

if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadUpcomingMovies();
  loadPopularMovies();
  loadTopratedMovies();
  loadLatestMovies();
  loadNowplayingMovies();
  loadActors();
}

module.exports = server;