import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';

const ITEMS_PER_PAGE = 20;
let currentPage = 1;
let totalPages = 1; // Declare totalPages globally

async function displayMovieCards(movies) {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = '';

  try {
    const genres = await getMovieGenres();

    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const movieImage = document.createElement('img');
      const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      movieImage.src = imageUrl;
      movieImage.alt = movie.title;
      movieImage.classList.add('movie-image');
      movieImage.tabIndex = 0;

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;
      movieTitle.classList.add('movie-title');

      const movieInfo = document.createElement('p');
      const releaseYear =
        (movie.release_date && movie.release_date.split('-')[0]) || 'undefined';

      const movieGenres = movie.genre_ids.map(genreId => {
        const foundGenre = genres.find(genre => genre.id === genreId);
        return foundGenre ? foundGenre.name : '';
      });

      const genresString = movieGenres.join(' ');
      movieInfo.textContent = `${genresString} | ${releaseYear} `;
      movieInfo.classList.add('movie-info');

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieInfo);
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error('There was a problem displaying movie cards:', error);
  }
}

async function getMoviesFromApi(page) {
  try {
    const response = await axios.request({
      ...apiMovie,
      params: {
        ...apiMovie.params,
        page: page || 1,
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.results;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

async function getTotalMoviesCount() {
  try {
    const response = await axios.request(apiMovie);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.total_results;
  } catch (error) {
    console.error('Error fetching total movie count:', error);
    return 0;
  }
}

async function displayPaginationNumbers() {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = '';

  const totalMovies = await getTotalMoviesCount();
  totalPages = Math.ceil(totalMovies / ITEMS_PER_PAGE); // Update totalPages globally

  const maxDisplayedPages = 5;
  const maxEllipsisGap = 2;

  let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

  if (totalPages > maxDisplayedPages) {
    if (endPage - startPage < maxDisplayedPages - 1) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    if (startPage > 1) {
      const firstPageButton = document.createElement('button');
      firstPageButton.textContent = '1';
      firstPageButton.addEventListener('click', () => goToPage(1));
      pageNumbersContainer.appendChild(firstPageButton);

      if (startPage > 2) {
        const ellipsisStart = document.createElement('span');
        ellipsisStart.textContent = '...';
        pageNumbersContainer.appendChild(ellipsisStart);
      }
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageNumberButton = document.createElement('button');
    pageNumberButton.textContent = i;
    pageNumberButton.addEventListener('click', () => goToPage(i));
    pageNumbersContainer.appendChild(pageNumberButton);
  }

  if (totalPages > maxDisplayedPages && endPage < totalPages) {
    if (totalPages - endPage > maxEllipsisGap) {
      const ellipsisEnd = document.createElement('span');
      ellipsisEnd.textContent = '...';
      pageNumbersContainer.appendChild(ellipsisEnd);
    }

    const lastPageButton = document.createElement('button');
    lastPageButton.textContent = totalPages;
    lastPageButton.addEventListener('click', () => goToPage(totalPages));
    pageNumbersContainer.appendChild(lastPageButton);
  }
}

async function displayMovieCardsFromApi() {
  try {
    const movies = await getMoviesFromApi(currentPage);
    await displayMovieCards(movies);
  } catch (error) {
    console.error('There was a problem displaying movie cards:', error);
  }
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayPageData();
}

async function displayPageData() {
  await displayMovieCardsFromApi();
  displayPaginationNumbers();
}

// Next and Previous Buttons
const nextButton = document.getElementById('nextPageButton');
const prevButton = document.getElementById('prevPageButton');

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayPageData();
  }
});

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayPageData();
  }
});

export default class ModalClassic {
  constructor(modal, btnClose) {
    this.modal = document.querySelector(modal);
    this.btnClose = document.querySelector(btnClose);
  }
  closingTracking() {
    const modalV = this.modal;
    const btnClose = this.btnClose;
    btnClose.addEventListener('click', clickInBtnClose);
    window.addEventListener('keydown', keydownInModal);
    modalV.addEventListener('click', clickInModal);
    function keydownInModal(e) {
      // console.log(e.code);
      if (e.code === 'Escape') {
        closeModal();
      }
    }
    function clickInModal(e) {
      // console.log(e);
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }
    function clickInBtnClose(e) {
      closeModal();
    }
    function closeModal() {
      modalV.classList.add('is-hidden');
      document.body.classList.remove('body--hidden');
      window.removeEventListener('keydown', keydownInModal);
    }
  }
  openModal() {
    this.modal.classList.remove('is-hidden');
    document.body.classList.toggle('body--hidden');
    this.closingTracking();
  }
}

// Example usage:
displayPageData();
