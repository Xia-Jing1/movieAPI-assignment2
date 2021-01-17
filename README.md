# Assignment 2 - Web API.

Name: Jing Xia

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,

 + Feature 1 - Multiple new routes, including a parameterised URL.
 + Feature 2 - Nested Document and/or object referencing in Mongo/Mongoose.
 + Feature 3 - Custom validation using Mongoose.
 + Feature 4 - Basic Authentication and protected routes.
 + Feature 5 - React App integration.
 + Feature 6 - Add login registration to access private routes.

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/Xia-Jing1/movieAPI-assignment2.git
```

followed by installation

```bat
git install
```

my react APP(assignment 1 movie APP):

```bat
git clone https://github.com/Xia-Jing1/wad2-moviesApp.git
```



## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb+srv://admin:<password>@cluster0.vpowa.mongodb.net/<database>?retryWrites=true&w=majority
seedDB=true
secret=ilikecake
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|                               | GET                                | POST                     | PUT  | DELETE |
| ----------------------------- | ---------------------------------- | ------------------------ | ---- | ------ |
| /api/movies                   | Gets a list of movies              | add new movie            | N/A  | N/A    |
| /api/movies/{movieid}         | Get a movie                        | N/A                      | N/A  | N/A    |
| /api/movies/{movieid}/reviews | Get all reviews for a movie        | N/A                      | N/A  | N/A    |
| /api/movies/{movieid}/similar | Get all similar movies for a movie        | N/A                      | N/A  | N/A    |
| /api/actors                   | Get actor list                     | N/A                      | N/A  | N/A    |
| /api/actors/{actorid}         | Get a actor                        | N/A                      | N/A  | N/A    |
| /api/latest                   | Get latest movie list              | N/A                      | N/A  | N/A    |
| /api/latest/{movieid}         | Get a latest movie                 | N/A                      | N/A  | N/A    |
| /api/latest/{movieid}/reviews | Get all reviews for a latest movie | N/A                      | N/A  | N/A    |
| /api/nowplaying               | Get nowplaying movie list          | add new nowplaying movie | N/A  | N/A    |
| /api/nowplaying/{movieid}         | Get a nowplaying movie                 | N/A                    | N/A  | N/A    |
| /api/nowplaying/{movieid}/reviews | Get all reviews for a nowplaying movie | N/A                    | N/A  | N/A    |
| /api/nowplaying/{movieid}/similar | Get all similar movie for a nowplaying movie | N/A                    | N/A  | N/A    |
| /api/popular                      | Get popular movie list                 | add new popular movie  | N/A  | N/A    |
| /api/popular/{movieid}            | Get a popular movie                    | N/A                    | N/A  | N/A    |
| /api/popular/{movieid}/reviews    | Get all reviews for a popular movie    | N/A                    | N/A  | N/A    |
| /api/popular/{movieid}/similar    | Get all similar movies for a popular movie    | N/A                    | N/A  | N/A    |
| /api/toprated                     | Get toprated movie list                | add new toprated movie | N/A  | N/A    |
| /api/toprated/{movieid}           | Get a toprated movie                   | N/A                    | N/A  | N/A    |
| /api/toprated/{movieid}/reviews   | Get all reviews for a toprated movie   | N/A                    | N/A  | N/A    |
| /api/upcoming                     | Get upcoming movie list                | add new upcoming movie | N/A  | N/A    |
| /api/upcoming/{movieid}          | Get a upcoming movie                 | N/A                              | N/A           | N/A                                 |
| /api/upcoming/{movieid}/reviews  | Get all reviews for a upcoming movie | N/A                              | N/A           | N/A                                 |
| /api/users                       | Get all users                        | register or authenticate a user  | N/A           | N/A                                 |
| /api/users/{userName}/favourites | Get favourite movies for a user      | add a favourite movie for a user | N/A           | delete a favourite movie for a user |
| /api/users/{userid}              | N/A                                  | N/A                              | update a user | N/A                                 |




If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

![截屏2021-01-17 上午1.52.40](https://tva1.sinaimg.cn/large/008eGmZEgy1gmqggylcifj311c066tca.jpg)

![截屏2021-01-17 上午1.57.56](https://tva1.sinaimg.cn/large/008eGmZEgy1gmqvitwjvdj30sk068whe.jpg)

I use the same Authentication as labs.

Only users stored in the database can log in by entering the correct user name and password. New users can log in by registering successfully and entering the correct information. Visitors who do not log in cannot view these protected pages.

protected routes :

- /api/movies - moviesRouter
- /api/upcoming - upcomingRouter
- /api/popular - popularRouter
- /api/toprated - topratedRouter
- /api/latest - latestRouter
- /api/nowplaying - nowplayingRouter

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

React App link:https://github.com/Xia-Jing1/wad2-moviesApp

First open *package.json* and add the following property just before the closing brace (`}`):

~~~Javascript
proxy":"http://localhost:8080"
~~~

Change  *tmdb-api.js* with my API:

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const  getUpcomingMovies= () => {
  return fetch(
    '/api/upcoming',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const getPopularMovies = () => {
  return fetch(
    '/api/popular',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const getTopratedMovies = () => {
  return fetch(
    '/api/toprated',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const getLatestMovies = () => {
  return fetch(
    '/api/latest',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const getNowplayingMovies = () => {
  return fetch(
    '/api/nowplaying',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const getPopularPeople = () => {
  return fetch(
    '/api/actors',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

export const login = (username, password) => {
  return fetch('/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

export const signup = (username, password) => {
  return fetch('/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};
~~~

## Extra features

Feature 1 - Dynamic and interactive UI.  

Feature 2 - Integrated with the React app, added login interface, extensive and dynamic links.

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  



# Assignment 2 - Agile Software Practice.

Name: Jing Xia

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/users - returns an array of user objects.
+ Post /api/users - add a new user to the database.
+ Post /api/users?action=register - register a new user.
+ Get /api/users/${users.username}/favourites - returns favourite movies list of a specific user.
+ Post /api/users/${users.username}/favourites - add favourite movies.

+ Get /api/movies - returns an array of movie objects.

+ Get /api/movies/:id - returns detailed information on a specific movie.

+ Put /api/movies/:id - update a specific movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/movies - add a new movie to the database.

+ Delete /api/movies/:id - delete a specific movie.

  

+ Get /api/upcoming - returns an array of upcoming movie objects.

+ Get /api/upcoming/:id - returns detailed information on a specific upcoming movie.

+ Put /api/upcoming/:id - update a specific upcoming movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/upcoming - add a new upcoming movie to the database.

+ Delete /api/upcoming/:id - delete a specific upcoming movie.

  

+ Get /api/toprated - returns an array of toprated movie objects.

+ Get /api/toprated/:id - returns detailed information on a specific toprated movie.

+ Put /api/toprated/:id - update a specific toprated movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/toprated - add a new toprated movie to the database.

+ Delete /api/toprated/:id - delete a specific toprated movie.

  

+ Get /api/popular - returns an array of popular movie objects.

+ Get /api/popular/:id - returns detailed information on a specific popular movie.

+ Put /api/popular/:id - update a specific popular movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/popular - add a new popular movie to the database.

+ Delete /api/popular/:id - delete a specific popular movie.

  

+ Get /api/nowplaying - returns an array of nowplaying movie objects.

+ Get /api/nowplaying/:id - returns detailed information on a specific nowplaying movie.

+ Put /api/nowplaying/:id - update a specific nowplaying movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/nowplaying - add a new nowplaying movie to the database.

+ Delete /api/nowplaying/:id - delete a specific nowplaying movie.

  

+ Get /api/latest - returns an array of latest movie objects.

+ Get /api/latest/:id - returns detailed information on a specific latest movie.

+ Put /api/latest/:id - update a specific latest movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/latest - add a new latest movie to the database.

+ Delete /api/latest/:id - delete a specific latest movie.

  

+ Get /api/actors - returns an array of actor objects.

+ Get /api/actors/:id - returns detailed information on a specific actor.

+ Put /api/actors/:id - update a specific actor. The request payload includes the some/all of the following actor properties to be updated: name, known_for_department.

+ Post /api/actors - add a new actor to the database.

+ Delete /api/actors/:id - delete a specific actor.

  

##  Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

See tests/functional/api/movies/index.js 

+ Get /api/movies - test return a movie without anthorization. 
+ Get /api/movies/:id - test return detailed information on a specific movie without anthorization. 
+ Get /api/movies/:id - test return detailed information on a specific movie with invalid id. 
+ Post /api/movies - test adding a movie without anthorization. 
+ Put /api/movies/:id - test update a specific movie with invalid id. 
+ Put /api/movies/:id - test update a specific movie without anthorization. 
+ Delete /api/movies/:id - delete a specific movie without anthorization. 
+ Delete /api/movies/:id - delete a specific movie with invaild id. 

See tests/functional/api/upcoming/index.js 

+ Get /api/upcoming - test return a upcoming movie without anthorization. 
+ Get /api/upcoming/:id - test return detailed information on a specific upcoming movie without anthorization. 
+ Get /api/upcoming/:id - test return detailed information on a specific upcoming movie with invalid id.
+ Post /api/upcoming - test adding a upcoming movie without anthorization. 
+ Put /api/upcoming/:id - test update a specific upcoming movie with invalid id. 
+ Put /api/upcoming/:id - test update a specific upcoming movie without anthorization. 
+ Delete /api/upcoming/:id - delete a specific upcoming movie without anthorization. 
+ Delete /api/upcoming/:id - delete a specific upcoming movie with invaild id. 

See tests/functional/api/toprated/index.js 

+ Get /api/toprated - test return a toprated movie without anthorization. 
+ Get /api/toprated/:id - test return detailed information on a specific toprated movie without anthorization. 
+ Get /api/toprated/:id - test return detailed information on a specific toprated movie with invalid id. 
+ Post /api/toprated - test adding a toprated movie without anthorization. 
+ Put /api/toprated/:id - test update a specific toprated movie with invalid id. 
+ Put /api/toprated/:id - test update a specific toprated movie without anthorization. 
+ Delete /api/toprated/:id - delete a specific toprated movie without anthorization. 
+ Delete /api/toprated/:id - delete a specific toprated movie with invaild id. 

See tests/functional/api/popular/index.js 

+ Get /api/popular - test return a popular movie without anthorization. 
+ Get /api/popular/:id - test return detailed information on a specific popular movie without anthorization. 
+ Get /api/popular/:id - test return detailed information on a specific popular movie with invalid id. 
+ Post /api/popular - test adding a popular movie without anthorization. 
+ Put /api/popular/:id - test update a specific popular movie with invalid id. 
+ Put /api/popular/:id - test update a specific popular movie without anthorization. 
+ Delete /api/popular/:id - delete a specific popular movie without anthorization. 
+ Delete /api/popular/:id - delete a specific popular movie with invaild id. 

See tests/functional/api/nowplaying/index.js 

+ Get /api/nowplaying - test return a nowplaying movie without anthorization. 
+ Get /api/nowplaying/:id - test return detailed information on a specific nowplaying movie without anthorization. 
+ Get /api/nowplaying/:id - test return detailed information on a specific nowplaying movie with invalid id. 
+ Post /api/nowplaying - test adding a nowplaying movie without anthorization. 
+ Put /api/nowplaying/:id - test update a specific nowplaying movie with invalid id.
+ Put /api/nowplaying/:id - test update a specific nowplaying movie without anthorization. 
+ Delete /api/nowplaying/:id - delete a specific nowplaying movie without anthorization. 
+ Delete /api/nowplaying/:id - delete a specific nowplaying movie with invaild id. 

See tests/functional/api/latest/index.js 

+ Get /api/latest - test return a latest movie without anthorization. 
+ Get /api/latest/:id - test return detailed information on a specific latest movie without anthorization. 
+ Get /api/latest/:id - test return detailed information on a specific latest movie with invalid id. 
+ Post /api/latest - test adding a latest movie without anthorization. 
+ Put /api/latest/:id - test update a specific latest movie with invalid id. 
+ Put /api/latest/:id - test update a specific latest movie without anthorization. 
+ Delete /api/latest/:id - delete a specific latest movie without anthorization. 
+ Delete /api/latest/:id - delete a specific latest movie with invaild id. 

See tests/functional/api/actors/index.js 

+ Get /api/actors - test return a actor without anthorization. 
+ Get /api/actors/:id - test return detailed information on a specific actor without anthorization. 
+ Get /api/actors/:id - test return detailed information on a specific actor with invalid id. 
+ Post /api/actors - test adding a actor without anthorization. 
+ Put /api/actors/:id - test update a specific actor with invalid id. 
+ Put /api/actors/:id - test update a specific actor without anthorization. 
+ Delete /api/actors/:id - delete a specific actor without anthorization. 
+ Delete /apiactor/:id - delete a specific actor with invaild id. 

See tests/functional/api/favourite/index.js

+ Post /api/users/${users.username}/favourites - test adding a favourite  movie with invalid id. 

  

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://dashboard.heroku.com/apps/movies-api-staging-assignment2 - Staging deployment
+ https://dashboard.heroku.com/apps/agile-assignment2-production - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![截屏2021-01-16 下午12.45.55](https://tva1.sinaimg.cn/large/008eGmZEgy1gmptpou9erj31c00u0e81.jpg)

+ Production app overview 

![截屏2021-01-16 下午12.49.55](https://tva1.sinaimg.cn/large/008eGmZEgy1gmptt40ivnj31c00u0e81.jpg)

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.png