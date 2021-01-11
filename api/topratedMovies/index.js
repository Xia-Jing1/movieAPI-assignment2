import topratedModel from './topratedModel';
import express from 'express';
import {
  getMovieReviews,getMovie
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  topratedModel.find().then(topratedMovies => res.status(200).send(topratedMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovie(id).then(topratedMovies => res.status(200).send(topratedMovies)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});

export default router;