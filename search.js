const id = localStorage.getItem("id")
let search;

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
  
const searchMovieListEl = document.querySelector(".search__movie--list")

  
async function searchMovies(id, filter) {

    const searchWrapper = document.querySelector('.searches');

    searchWrapper.classList += ' search__loading'
    
    if (!search) {
    search = await fetch(`https://api.themoviedb.org/3/search/movie?query=${id}}&include_adult=false&language=en-US&page=1`, options);

    
  }
    const searchMovieData = await search.clone().json();
    
    searchWrapper.classList.remove('search__loading');

    if (filter === "A-Z") {
      console.log(searchMovieData.results.sort((a,b) => (a.title.toLowerCase().localeCompare(b.title.toLowerCase()))));
    }
    
    else if (filter === "Z-A") {
      console.log(searchMovieData.results.sort((a,b) => (b.title.toLowerCase().localeCompare(a.title.toLowerCase()))));
    }

    else if (filter === "HIGH_RATING") {
      console.log(searchMovieData.results.sort((a,b) => (b.vote_average - a.vote_average)));
    }


    else if (filter === "LOW_RATING") {
      console.log(searchMovieData.results.sort((a,b) => (a.vote_average - b.vote_average)));
    }

    console.log(filter)
    searchMovieListEl.innerHTML = searchMovieData.results
    .slice(0, 18)
    .map((movie) => movieHTML(movie))
    .join("");

    localStorage.setItem("id", "");
  }

setTimeout(() => {
  searchMovies(id, filter);
  });


function filterMovies(event) {
    searchMovies(id, event.target.value);
}


function placeOrder(form){
  if (document.getElementById('search').value == "") {
    return false;
  }
  form.submit();
  let id = document.getElementById('search').value;
  localStorage.setItem("id", id);
}

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
  