import actorModel from './actorModel';
import express from 'express';
// import {
//   getPeople
// } from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  actorModel.find().then(actors => res.status(200).send(actors)).catch(next);
});
//后期修改
// router.get('/:id', (req, res, next) => {
//   const id = parseInt(req.params.id);
//   getPeople(id).then(actor => res.status(200).send(actor)).catch(next);
// });


export default router;