const apiKey = 'c16ee967';
const keywords = [
  'man', 'woman', 'love', 'dark', 'light', 'city', 'night', 'day', 'fire', 'war',
  'ghost', 'dream', 'truth', 'game', 'power', 'world', 'secret', 'fear', 'hope', 'storm',
  'angel', 'devil', 'monster', 'hero', 'legend', 'destiny', 'hunter', 'alien', 'robot', 'revenge',
  'future', 'past', 'life', 'death', 'battle', 'code', 'killer', 'spy', 'crime', 'magic',
  'detective', 'prison', 'escape', 'fight', 'army', 'planet', 'zombie', 'vampire', 'witch', 'curse',
  'forest', 'river', 'blood', 'sand', 'ice', 'dragon', 'time', 'mirror', 'shadow', 'clown',
  'child', 'parent', 'king', 'queen', 'soldier', 'space', 'mission', 'alien', 'trap', 'treasure',
  'voice', 'signal', 'ring', 'island', 'virus', 'doctor', 'nurse', 'patient', 'storm', 'road',
  'train', 'plane', 'hotel', 'beach', 'mountain', 'snow', 'sun', 'moon', 'star', 'music'
];

const root = document.querySelector('.movie-card');
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');

let isLoading = false; // trạng thái loading
let isSearching = false; // trạng thái đang search (khác với load auto)

async function fetchAndRenderMovies(keyword, isNewSearch = false) {
  if (!keyword) {
    return;
  }
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(keyword)}`;

  try {
    if (isNewSearch) {
      root.innerHTML = ''; // Xóa hết phim hiện tại khi search mới
    }
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === "True") {
      data.Search.forEach((movie) => {
        if (root.lastElementChild === null || root.lastElementChild.children.length >= 4) {
          const rowDiv = document.createElement('div');
          rowDiv.classList.add('row');
          root.appendChild(rowDiv);
        }
        const currentRow = root.lastElementChild;

        const movieCard = `
          <div class="movie-card__container" data-imdbid="${movie.imdbID}">
            <div class="movie-card__poster">
              <img 
                   src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445?text=No+Image'}" 
                   alt="${movie.Title} Poster"
                  onerror="this.onerror=null;this.src='https://placehold.co/300x445?text=No+Image';"
              />
              <div class="movie-card__title">
                <h2>${movie.Title}</h2>
              </div>
            </div>
            <div class="movie-card__footer">
              <i class="movie-card__year">
                <svg class="movie-card__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16
                           c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path>
                </svg>&nbsp;${movie.Year}
              </i>
              <span class="movie-card__like">🤍</span>
            </div>
          </div>
        `;

        currentRow.insertAdjacentHTML('beforeend', movieCard);
      });
    } else {
      if (isNewSearch) {
        root.innerHTML = `<p style="color: white; padding: 1rem;">Không tìm thấy phim với từ khóa: "${keyword}"</p>`;
      }
      console.warn('Không tìm thấy phim với từ khóa:', keyword);
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
}

function getRandomKeyword() {
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
}

function handleScroll() {
  if (isSearching) return; // Nếu đang search thì không load tự động

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 200;

  if (scrollPosition >= threshold && !isLoading) {
    isLoading = true;
    fetchAndRenderMovies(getRandomKeyword()).finally(() => {
      isLoading = false;
    });
  }
}

function startAutoFetch() {
  // Gọi lần đầu với keyword ngẫu nhiên
  fetchAndRenderMovies(getRandomKeyword());

  // Lắng nghe scroll để load phim tự động
  window.addEventListener('scroll', handleScroll);
}

// Xử lý sự kiện search
function handleSearch() {
  const keyword = searchInput.value.trim();
  if (!keyword) {
    // Nếu input trống, chuyển về load tự động
    isSearching = false;
    root.innerHTML = '';
    fetchAndRenderMovies(getRandomKeyword());
    return;
  }
  isSearching = true; // Đang search
  fetchAndRenderMovies(keyword, true);
}

// Bắt sự kiện nút search click
searchButton.addEventListener('click', handleSearch);

// Bắt sự kiện Enter khi đang focus input
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

window.addEventListener('DOMContentLoaded', startAutoFetch);

document.querySelector('.navbar__logo').addEventListener('click', () => {
  window.location.href = 'index.html'; 
});

root.addEventListener('click', (e) => {
  const card = e.target.closest('.movie-card__container');
  if (card) {
    const imdbID = card.getAttribute('data-imdbid');
    if (imdbID) {
      window.location.href = `detail.html?imdbID=${imdbID}`;
    }
  }
});
