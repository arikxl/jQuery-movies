
const API_URL = 'http://www.omdbapi.com?apikey=1b26c0b1'

$(document).ready(() => {
    $('form').on('submit', (e) => {
        e.preventDefault();
        const searchText =($('input').val());
        getMovies(searchText);
    })

})

function getMovies(searchText) {
    axios.get(`${API_URL}&s=${searchText}`) 
    .then((response) =>{
        const movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="movie" key=${index}>
              
                <div>
                    <p>${movie.Year}</p>
                </div>
      
                <div>
                    <img src=${movie.Poster
                    ? movie.Poster 
                    : 'https://www.istockphoto.com/vector/thumbnail-image-vector-graphic-gm1147544807-309589937'}
                    alt=${movie.Title} />
                </div>
      
                <div>
                    <span>${movie.Type}</span>
                    <h3>${movie.Title}</h3>
                    <a onclick="movieSelected('${movie.imdbID}')"
                     href="#" class="btn">
                    Movie Details
                    </a>
                </div>
            </div>
            `
        });
        $('.container').html(output);

    })
    .catch((error) => {
        console.log(error)
    })
};

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
};

function getMovie() {
    const movieId = sessionStorage.getItem('movieId');
    axios.get(`${API_URL}&i=${movieId}`)
    .then((response) => {
        const movie = response.data;
        console.log('movie:', movie);
        let output =`
            <div class="movie-details">
                <div class="flex-column flex">
                    <h2>${movie.Title}<h2>
                    <img src=${movie.Poster}
                </div>
            </div>
                    <ul>
                        <li>${movie.Genre}</li>
                        <li>${movie.Released}</li>
                        <li>${movie.Rated}</li>
                        <li>${movie.imdbRating}</li>
                        <li>${movie.Director}</li>
                        <li>${movie.Writer}</li>
                        <li>${movie.Actors}</li>
                    </ul>

                    <div class="">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn">Go Back To Search</a>
                  </div>
        `;

        $('.movie-details').html(output);


    })
    .catch((error) => {
        console.log(error)
    });
}
