// Get elements
const movieWrapper = document.querySelector('.movie-wrapper');
const movieTitle = document.querySelector('.movie-title');
const moviePlot = document.querySelector('.movie-plot');

// Fetch data about the movie stored in session storage
fetch(`https://api.themoviedb.org/3/movie/${sessionStorage.getItem('movieID')}?api_key=820d6db8746f3de6a93c6c922bf8074e&language=en-US`)
    .then(response => response.json())
    .then(data => {
        // Set the movie-wrapper background to backdrop image
        movieWrapper.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
        url('https://image.tmdb.org/t/p/original${data.backdrop_path}') top center/cover`
        // Set the movie-wrapper background attachment to fixed to give a slight parallax effect
        movieWrapper.style.backgroundAttachment = 'fixed';
        // Set the movie title text content to the movie title from fetch data
        movieTitle.textContent = data.original_title;
        // Set the movie plot text content to the movie overview from fetch data
        moviePlot.textContent = data.overview;
    })