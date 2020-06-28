// Get elements
const topRatedMovies = document.querySelector('#top-rated .movies-section-container');
const mostPopularMovies = document.querySelector('#most-popular .movies-section-container');

// This function creates a movie element and appends it to a container
function createMovie(movieData, container) {
    // Create element
    const movie = document.createElement('div');
    // Add .movie class to element
    movie.classList.add('movie');
    // Set movie poster as background of element
    movie.style.background = `url('https://image.tmdb.org/t/p/w500${movieData.poster_path}') center center/cover`
    // Set movie ID in session storage and navigate to movie page on click
    movie.onclick = () => {
        sessionStorage.setItem('movieID', movieData.id)
        window.location = 'movie.html'
    }
    // Append movie element to movie container
    container.appendChild(movie);
}

// Fetch popular movies - landing page
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=820d6db8746f3de6a93c6c922bf8074e&language=en-US&adult=false&page=1`)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        movies.forEach(movie => {
            createMovie(movie, mostPopularMovies);
        })
    })

// Fetch top rated movies - landing page
fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=820d6db8746f3de6a93c6c922bf8074e&language=en-US&adult=false&page=1`)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        movies.forEach(movie => {
            createMovie(movie, topRatedMovies);
        })
    })