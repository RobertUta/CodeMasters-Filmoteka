
function CardFilminHtml(data) {
    const genresArr = [];
    data.genres.length
      ? data.genres.map(genre => {
          genresArr.push(genre.name);
        })
      : '';
    return `
    <div class="modal-movie__img-container">
    <img class="modal-movie__img" loading="lazy" src="${
      data.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + data.poster_path
        : 'https://i.postimg.cc/6pzyh7Wc/pngwing-com.png'
    }" alt="${
      data.original_title || data.original_name
    }" width="240" height="357" />
    ${
      data.production_companies.length
        ? data.production_companies[0].logo_path
          ? ` <img class="modal-movie__img-company" loading="lazy" src="${
              data.production_companies[0].logo_path
                ? 'https://image.tmdb.org/t/p/w500' +
                  data.production_companies[0].logo_path
                : '-'
            }" alt="${
              data.production_companies[0].name || 'logo company'
            }" width="240" height="357" />`
          : ''
        : ' '
    }
    </div>
      <div>
        <h1 class="modal-movie__title">${
          data.original_title || data.original_name
            ? data.original_title || data.original_name
            : '-'
        }</h1>
        <ul class="modal-movie__list">
          <li class="modal-movie__item">
            <p class="modal-movie__item-categories">Vote / Votes</p>
            <p class="modal-movie__item-inf">
              <span class="modal-movie__item-vote">${data.vote_average}</span> /
              <span class="modal-movie__item-votes">${data.vote_count}</span>
            </p>
          </li>
          <li class="modal-movie__item">
            <p class="modal-movie__item-categories">Popularity</p>
            <p class="modal-movie__item-inf">${data.popularity}</p>
          </li>
          <li class="modal-movie__item">
            <p class="modal-movie__item-categories">Original Title </p>
            <p class="modal-movie__item-inf modal-movie__item-inf--uppercase">
              ${data.original_title}
            </p>
          </li>
          <li class="modal-movie__item">
            <p class="modal-movie__item-categories">Genre</p>
            <p class="modal-movie__item-inf">${
              genresArr.length > 0 ? genresArr.join(', ') : '-'
            }</p>
          </li>
        </ul>
        <h2 class="modal-movie__about">About</h2>
        <p class="modal-movie__about-text">
          ${data.overview.length > 0 ? data.overview : 'Absent...'}
        </p>
        <div class="modal-movie__btn-section">
          <button
              class="modal-movie__btn modal-movie__btn--margin modal-movie__btn-watched"
              type="button" data-ls='false'
            >
              add to Watched
            </button>
            <button class="modal-movie__btn modal-movie__btn-queue" type="button" data-ls='false'>add to queue</button>
        </div>
      </div>
        `;
  }

  function CardFilminHtmlIfError(Error) {
    return `
      <div class="error-message">
      <h1>${Error.response.status}</h1>
      <h2>${Error.name}</h2>
      <h3>${Error.message}</h3>
  <p>try later</p>
      </div>
        `;
  }
  function movieBtnHtml() {
    return `
        <button type="button" class="modal-movie__movie">
        <svg class="icon modal-movie__icon" width="40" height="40">
        <use xlink:href="${svgYoutube}#icon-youtube"></use>
        </svg>
      </button>
        `;
  }
  function returnMovie(Movie) {
    return `
    <div class='movie-iframe'>
  <iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="${Movie.name}" width="100%" height="100%" src="https://www.youtube.com/embed/${Movie.key}"></iframe>
    </div>
    `;
  }