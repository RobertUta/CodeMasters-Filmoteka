import axios from 'axios';

const API_KEY = '6597b28caedbe4fd363f13cbb975e58f';
const BASE_URL = 'https://api.themoviedb.org/3';

async function getPopularData(page) {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.data;
    return response.data;
  } catch (error) {
    console.error('Smth wrong with api get full trends' + error);
  }
}

async function fetchMovieSearcher(text, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${text}&page=${page}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}

async function fetchMovieForId(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}

async function fetchMovieVideoForId(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}

async function getGenres() {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}

export {
  getPopularData,
  fetchMovieSearcher,
  fetchMovieForId,
  getGenres,
  fetchMovieVideoForId,
};
