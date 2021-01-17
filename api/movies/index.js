import movieModel from './movieModel';
import express from 'express';
import {
  getMovieReviews, getMovieSimilar, getMovieCredits
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});

router.get('/:id/similar', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(403).json({ code: 403, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const movies = await getMovieSimilar(id);
  if (movies == "") return res.status(404).json({ code: 404, msg: 'No similar movies of this movie.' });
  res.status(200).json(movies);
});

router.get('/:id/credits', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieCredits(id)
  .then(credits => res.status(200).send(credits))
  .catch((error) => next(error));
});


router.post('/', (req, res) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    //Adds a random id if missing. 
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie; 
    movieModel.movies.push(newMovie);
    res.status(201).send(newMovie);
  } else {
    res.status(405).send({
      message: "Invalid Movie Data",
      status: 405
    });
  }
});

// Update a movie
router.put('/:id', (req, res) => {
  const key = parseInt(req.params.id);
  const updateMovie = req.body;
  const index = movieModel.movies.map((movie) => {
    return movie.id;
  }).indexOf(key);
  if (index !== -1) {
    !updateMovie.id ? updateMovie.id = key : updateMovie;
    movieModel.movies.splice(index, 1, updateMovie);
    res.status(200).send(updateMovie);
  } else {
    res.status(404).send({
      message: 'Unable to find Movie',
      status: 404
    });
  }
});



export default router;