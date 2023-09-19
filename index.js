// http://www.omdbapi.com/?i=tt3896198&apikey=60e4b39a

const movieListEl = document.querySelector(".movie-list")

async function renderMovies() {
    const movies = await fetch("http://www.omdbapi.com/?apikey=60e4b39a&s=fast")
    const movieData = await movies.json()

    console.log(movieData.Search)

    movieListEl.innerHTML = movieData.Search.map((movie) => movieHTML(movie)).join("")
}

renderMovies()

function movieHTML(movie) {
    return `<div class="movies movies__loading">
    <a href="https://www.imdb.com/title/${movie.imdbID}" class="movie__link">
    <figure class="movie__img--wrapper">
        <img src="${movie.Poster}" alt="" class="movie__img">
    </figure>
    <div class="movie__title"> ${movie.Title}
    </div>
    <div class="movie__description">
        <p class="movie__year">${movie.Year}</p>
    </div>
    </a>
</div>
    `
}
