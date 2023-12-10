var modal = document.getElementById('myModal');
var btn = document.getElementById('openModalBtn');
var span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  openModal();
};

function openModal() {
  modal.style.display = 'flex';
  displayMovieGenres();
  displayTrendingMovies();
}

function closeModal() {
  modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

const displayTrendingMovies = async () => {
  try {
    const response = await fetch(apiMovie.url, {
      method: apiMovie.method,
      headers: apiMovie.headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Selectează lista de filme populare
    const trendingMoviesList = document.getElementById('trendingMoviesList');

    // Iterează prin filme și adaugă fiecare în lista
    data.results.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = movie.title;
      trendingMoviesList.appendChild(li);
    });
  } catch (error) {
    console.error('There was a problem displaying trending movies:', error);
  }
};

const displayMovieGenres = async () => {
  try {
    const genres = await getMovieGenres();

    // Selectează lista de genuri
    const genresList = document.getElementById('movieGenresList');

    // Iterează prin genuri și adaugă fiecare în lista
    genres.forEach(genre => {
      const li = document.createElement('li');
      li.textContent = genre.name;
      genresList.appendChild(li);
    });
  } catch (error) {
    console.error('There was a problem displaying movie genres:', error);
  }
};
