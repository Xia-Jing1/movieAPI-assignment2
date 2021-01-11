import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import upcomingModel from '../api/upcomingMovies/upcomingModel';
import popularModel from '../api/popularMovies/popularModel';
import {movies} from './movies.js';
import {upcomingMovies} from './upcoming.js';
import {popularMovies} from './popular.js';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}  

export async function loadUpcomingMovies() {
  console.log('load upcoming movies data');
  console.log(upcomingMovies.length);
  try {
    await upcomingModel.deleteMany();
    await upcomingModel.collection.insertMany(upcomingMovies);
    console.info(`${upcomingMovies.length} Upcoming Movies were successfully stored.`);
} catch (err) {
    console.error(`failed to Load upcoming movie Data: ${err}`);
  }
}


export async function loadPopularMovies() {
  console.log('load popular movies data');
  console.log(popularMovies.length);
  try {
    await popularModel.deleteMany();
    await popularModel.collection.insertMany(popularMovies);
    console.info(`${popularMovies.length} Popular Movies were successfully stored.`);
} catch (err) {
    console.error(`failed to Load popular movie Data: ${err}`);
  }
}
