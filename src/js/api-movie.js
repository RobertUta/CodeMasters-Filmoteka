const apiMovie = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2JmMmQ0NWQwM2M1NmU0MDM1MWY0MDRmMmI5YzE2NSIsInN1YiI6IjY1NzIxNGRmNmRjNmMwMDBlNGE2ZWY3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7dXnjssQSxvw76PThr3jqG3qtYeckQspl7-jRKHG-s',
  },
};

export default apiMovie;

// import axios from 'axios';
// import apiAll from './api-movie.js';

// axios
//   .request(apiMovie)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
