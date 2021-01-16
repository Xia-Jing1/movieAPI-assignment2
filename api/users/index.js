import movieModel from '../../api/movies/movieModel';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from './userModel';



const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res,next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

// Register OR authenticate a user
router.post('/', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({
      success: false,
      msg: 'Please pass username and password.',
    });
  }
  if (req.query.action === 'register') {
    let pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    var result=pass.test(req.body.password);
    if(result){
    await User.create(req.body).catch(next);
    res.status(201).json({
      code: 201,
      msg: 'Successful created new user.',
    });}
  } else {
    const user = await User.findByUserName(req.body.username).catch(next);
      if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.SECRET);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          res.status(401).json({
            code: 401,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
});

// Update a user
router.put('/:id',  (req, res,next) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user)).catch(next);
});

//Add a favourite. 
router.post('/:userName/favourites', async (req, res, next) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite);
  const user = await User.findByUserName(userName);
  try{
  if(user.favourites.indexOf(movie._id) === -1) {
      await user.favourites.push(movie._id);
      await user.save();
    }
    res.status(201).json(user);}
   
      catch (error) {
        return next(error);
     // console.error(`invalid`);
      
    }
  });

router.get('/:userName/favourites', (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('favourites').then(
    user => res.status(201).json(user.favourites)
  ).catch(next);
});


//delete a favourite.
router.delete('/:userName/favourites',  async (req, res, next) => {
  const id = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(id).catch(next);
  const user = await User.findByUserName(userName);
  const index = user.favourites.indexOf(movie._id);
  if (index > -1) {
    user.favourites.splice(index, 1);
    await user.save(); 
    res.status(200).send({message: `Deleted movie id: ${id}.`,status: 200});
  }else{
    res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
  }
  });


  
export default router;