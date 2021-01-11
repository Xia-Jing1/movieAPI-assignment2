import nowplayingModel from './nowplayingModel';
import express from 'express';
import {
  getMovieReviews,getMovie
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  nowplayingModel.find().then(nowplayingMovies => res.status(200).send(nowplayingMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovie(id).then(nowplayingMovies => res.status(200).send(nowplayingMovies)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});

export default router;