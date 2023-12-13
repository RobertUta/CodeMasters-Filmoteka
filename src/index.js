import GALLERY from './js/gallery.js';
import { attachModalEventHandlers } from './js/modal-event-handlers.js';
import { getMoviesFromApi } from './js/api-movie.js';

import { displayMovieCards, getMoviesFromApi } from './js/gallery.js';

document.addEventListener('DOMContentLoaded', async function () {
  const movieContainer = document.querySelector('.movie-container');

  try {
    const movies = await getMoviesFromApi();
    await displayMovieCards(movies);
  } catch (error) {
    console.error('There was a problem displaying movies:', error);
  }
});
