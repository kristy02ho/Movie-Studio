// http://www.omdbapi.com/?i=tt3896198&apikey=60e4b39a
//https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1

function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWU4MzcyZGJmM2YyY2Y2NDE4NGZkMzQ1ODU0ZGM2NyIsInN1YiI6IjY1MDllMzAwNmMxOWVhMDBjYTQ2NGJiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9l6dgK9po3LdhmB8SY4_u3rImLXGxRLUXpo57fhp-a4",
  },
};

const popMovieListEl = document.querySelector(".popular__movie-list");
const newMovieListEl = document.querySelector(".new__movie--list");
const upcomingMovieListEl = document.querySelector(".upcoming__movie--list");
const topMovieListEl = document.querySelector(".top__movie--list");
// const searchMovieListEl = document.querySelector(".search__movie--list");
// const id = localStorage.getItem("id")
// let search = false



async function renderMovies() {
  // document.getElementById(home).style.display = 'block';
  // document.getElementById(searching).style.display = 'none';
  const popMovies = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const popMovieData = await popMovies.json();

  const newMovies = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );
  const newMovieData = await newMovies.json();

  const upcomingMovies = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  );
  const upcomingMovieData = await upcomingMovies.json();

  const topMovies = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const topMovieData = await topMovies.json();

  console.log(newMovieData.results);

  popMovieListEl.innerHTML = popMovieData.results
    .slice(0, 6)
    .map((movie) => movieHTML(movie))
    .join("");

  newMovieListEl.innerHTML = newMovieData.results
    .slice(0, 6)
    .map((movie) => movieHTML(movie))
    .join("");

    upcomingMovieListEl.innerHTML = upcomingMovieData.results
    .slice(0, 6)
    .map((movie) => movieHTML(movie))
    .join("");

    topMovieListEl.innerHTML = topMovieData.results
    .slice(0, 6)
    .map((movie) => movieHTML(movie))
    .join("");
}

// async function searchMovies(id) {
//   const searchMovie = await fetch(`https://api.themoviedb.org/3/search/movie?query=${id}}&include_adult=false&language=en-US&page=1`, options);
//   const searchMovieData = await searchMovie.json();

//   console.log(searchMovieData);
//   searchMovieListEl.innerHTML = searchMovieData.results
//   .slice(0, 12)
//   .map((movie) => movieHTML(movie))
//   .join("");
// }

renderMovies();

// function searchBar() {
//   if (!search) {
//     document.getElementById(searching).style.display = 'none';
//     document.getElementById(home).style.display = 'block';
//   }
//   document.getElementById(home).style.display = 'none';
//   document.getElementById(searching).style.display = 'block';

// }

function placeOrder(form){
  if (document.getElementById('search').value == "") {
    return false;
  }
  form.submit();
  let id = document.getElementById('search').value;
  localStorage.setItem("id", id);
}


// searchMovies(id);

function movieHTML(movie) {
  return `<div class="movies movies__loading">
    <a href="" class="movie__link">
    <figure class="movie__img--wrapper">
        <img src="https://image.tmdb.org/t/p/original/${
          movie.poster_path
        }" alt="" class="movie__img">
    </figure>
    <div class="movie__title"> ${movie.title}
    </div>
    <div class="movie__description">
        <p class="movie__year">${movie.release_date.substring(0, 4)}</p>
        <div class="rating">
        <figure class="star__logo">
        <img src="./star.png" alt="" class="star">
        </figure>
        <p class="movie__rating">${movie.vote_average.toFixed(1)}</p>
        </div>
    </div>
    </a>
</div>
    `;
}

