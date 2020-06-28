// Get elements
const form = document.querySelector('#main-form');
const searchBox = document.querySelector('#search-box');
const moviesResultsContainer = document.querySelector('.movie-results__container');

// This function creates a movie element and appends it to a container
function createMovie(movieData, container) {
    // Create element
    const movie = document.createElement('div');
    // Add .movie class to element
    movie.classList.add('movie');
    // Set movie poster as background of element
    movie.style.background = `url('https://image.tmdb.org/t/p/w500${movieData.poster_path}') top center/cover`
    // Set movie ID in session storage and navigate to movie page on click
    movie.onclick = () => {
        sessionStorage.setItem('movieID', movieData.id)
        window.location = 'movie.html'
    }
    // Append movie element to movie container
    container.appendChild(movie);
}

function displayPlaceholderMovies() {
    // Fetch a list of latest movies to display as placeholders
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=820d6db8746f3de6a93c6c922bf8074e&language=en-US&adult=false`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const movies = data.results;
            movies.forEach(movie => {
                createMovie(movie, moviesResultsContainer);
            })
        })
}
// Run this function when the page loads to display a showcase of upcoming movies as placeholders until the user searches for a specific movie title
displayPlaceholderMovies();

// When the user submits the search form fire an event
form.addEventListener('submit', (e) => {
    // Reset the movies result container content;
    moviesResultsContainer.innerHTML = '';
    // Prevent the form from submitting by default
    e.preventDefault();
    // Store the user's search query in a variable and trim it
    const userSearch = searchBox.value.trim();
    // Check if user's search query is valid
    if (userSearch != '') {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=820d6db8746f3de6a93c6c922bf8074e&language=en-US&page=1&include_adult=false&query=${userSearch}`)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                // Check is search query matches any movies
                if (movies.length != 0) {
                    movies.forEach(movie => {
                        // Check is the movie has a backdrop image
                        if (movie.backdrop_path) {
                            // Create the movie div if it passes the image check
                            createMovie(movie, moviesResultsContainer)
                        }
                    })
                    // Alert if search query doesn't match any movies
                } else {
                    alert('No matching movies found. Please search for another movie.');
                }
            })
        // If search query isn't valid alert with an error
    } else {
        alert('Please enter a movie');
        displayPlaceholderMovies();
    }
    // Reset search box value
    searchBox.value = '';
});