import axios from 'axios';
import { getMoviesFromApi } from './api-movie.js';
import { getMovieGenres } from './api-genres.js';

export async function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal.classList.contains('modal-show')) {
    try {
      const movies = await getMoviesFromApi();
      const genres = await getMovieGenres();

      const movie = movies.find(movie => movie.id.toString() === modalId);

      if (!movie) {
        console.error('Movie not found');
        return;
      }

      // Populate modal content with movie details
      const modalImage = modal.querySelector('#modalImage');
      const modalTitle = modal.querySelector('#modalTitle');
      const modalInfo = modal.querySelector('#modalInfo');

      modalImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      modalImage.alt = movie.title;
      modalTitle.textContent = movie.title;

      const releaseYear =
        (movie.release_date && movie.release_date.split('-')[0]) || 'undefined';

      const movieGenres = movie.genre_ids.map(genreId => {
        const foundGenre = genres.find(genre => genre.id === genreId);
        return foundGenre ? foundGenre.name : '';
      });

      const genresString = movieGenres.join(' ');
      modalInfo.textContent = `Release Year: ${releaseYear} | Genres: ${genresString}`;

      document.body.style.overflow = 'hidden'; // Disable page scrolling while modal is shown
      modal.style.display = 'flex';
      modal.classList.add('modal-show');
    } catch (error) {
      console.error('There was a problem opening the modal:', error);
    }
  }
}

export function closeModal() {
  const modal = document.querySelector('.modal.modal-show');

  if (modal) {
    document.body.style.overflow = 'initial'; // Enable page scrolling when modal is hidden
    modal.classList.add('modal-hide');
    setTimeout(() => {
      modal.classList.remove('modal-show', 'modal-hide');
      modal.style.display = 'none';
    }, 200);
  }
}
