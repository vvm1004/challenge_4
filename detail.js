const params = new URLSearchParams(window.location.search);
const imdbID = params.get('imdbID');

if (imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=c16ee967`)
    .then(res => res.json())
    .then(data => {
      createMovieHTML(data);
    });
}

function createMovieHTML(data) {
  const movieContainer = document.querySelector('.movie');

  // Xóa nội dung cũ nếu có
  movieContainer.innerHTML = '';

  // Tạo phần poster
  const posterDiv = document.createElement('div');
  posterDiv.className = 'movie__poster';

  const posterImg = document.createElement('img');
  posterImg.src = data.Poster !== 'N/A' ? data.Poster : 'https://placehold.co/300x445?text=No+Image';
  posterImg.alt = `${data.Title} Poster`;

  posterDiv.appendChild(posterImg);

  // Tạo phần info
  const infoDiv = document.createElement('div');
  infoDiv.className = 'movie__info';

  infoDiv.innerHTML = `
    <div class="movie__container">
      <div class="movie__wrapper">
        <h1 class="movie__title">${data.Title}</h1>
        <div class="movie__metadata">
          <span>${data.Year}</span> |
          <span>${data.Rated}</span> |
          <span>${data.Released}</span> |
          <span>${data.Runtime}</span>
        </div>
      </div>
      <div class="movie__rating">
        <div class="movie__rating-top">
          <svg class="movie__rating-star" focusable="false" viewBox="0 0 24 24" color="#e4bb24" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
          <span class="movie__rating-score">${data.imdbRating}</span>
          <span class="movie__rating-outof">/10</span>
        </div>
        <div class="movie__rating-count">${data.imdbVotes}</div>
      </div>
    </div>

    <p class="movie__description">${data.Plot}</p>

    <hr class="movie__divider" />
    
    <div class="movie__details">
      <div class="movie__detai-key">
        <p><strong>Genre :</strong></p>
        <p><strong>Director :</strong></p>
        <p><strong>Writer :</strong></p>
        <p><strong>Actors :</strong></p>
        <p><strong>Language :</strong></p>
        <p><strong>Country :</strong></p>
        <p><strong>Awards :</strong></p>
        <p><strong>Production :</strong></p>
      </div>

      <div class="movie__detai-value">
        <p>${data.Genre}</p>
        <p>${data.Director}</p>
        <p>${data.Writer}</p>
        <p>${data.Actors}</p>
        <p>${data.Language}</p>
        <p>${data.Country}</p>
        <p>${data.Awards}</p>
        <p>${data.Production}</p>
      </div>

    </div>
  `;

  movieContainer.appendChild(posterDiv);
  movieContainer.appendChild(infoDiv);
}

document.querySelector('.navbar__logo').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.querySelector('.navbar__arrow').addEventListener('click', () => {
  window.location.href = 'index.html';
});
