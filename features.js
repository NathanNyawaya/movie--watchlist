const movieInfo = document.getElementById("root");
const savedMoviePage = document.getElementById("root");

// list of ids searched
let movieSearched = [];
let myMovies = [];
let savedMovies = JSON.parse(localStorage.getItem("MyMovies"));

// FETCH data from the api
const getMovieId = async (input) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${input}&apikey=3fca7286&`
    );
    const data = await response.json();
    data ? console.log("fetch successful") : console.log("fetch unsuccessful");
    data.Search.map((movie) => {
      getMovieData(movie.imdbID);
      movieSearched.push(movie.imdbID);
    });
  } catch (error) {
    console.log(error);
  }
};

const getMovieData = async (movie) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${movie}&apikey=3fca7286&`
    );
    const data = await res.json();
    renderMovie(data);
  } catch (error) {
    console.log(error);
  }
};

// render the searched movies
function renderMovie(single) {
  movieInfo.innerHTML += `
        <div key=${single.imdbID}>
            <div class="movies">
                <img src=${single.Poster} alt="poster" class="movie--img" />
                <div class="movie-info">
                    <div class="title">
                        <h3>${single.Title}</h3>
                        <div class="star">
                            <img src="images/star.png" alt="start"/>
                            <h4>${single.imdbVotes}</h4>
                        </div>
                    </div>
                    <div class="movie-meta-data">
                        <p>${single.Runtime}</p>
                        <p>${single.Genre}</p>
                        <div class="add-movie">
                            <img src="images/add.png" id="add" data-id-to-add="${single.imdbID}"/>
                            <p id='btn-text'>Watchlist</p>
                        </div>
                    </div>
                    <p>${single.Plot}</p>
                </div>
            </div>
            <div class="line"/>
        </div>
        `;
}

// adding tp watch movie-list
function addToWatchlist(movieToAdd) {
  if (movieToAdd) {
    console.log(movieToAdd);
    let exists = myMovies.includes(movieToAdd);
    if (!exists) {
      myMovies = savedMovies;
      myMovies.push(movieToAdd);
      // console.log(myMovies);
      localStorage.setItem("MyMovies", JSON.stringify(myMovies));
    }
  }
}

// delete from to watch movie-list
function deleteToWatchlist(movieToDelete) {
  if (movieToDelete) {
    console.log(movieToDelete);
    let myList = JSON.parse(localStorage.getItem("MyMovies"));

    let updateList = myList.filter((item) => item != movieToDelete);
    console.log(updateList);
    localStorage.setItem("MyMovies", JSON.stringify(updateList));
    window.location.reload();
  }
}

// render watchlis

const renderWatchlist = async (movie) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${movie}&apikey=3fca7286&`
    );
    const data = await res.json();
    let single = {};
    single = data;
    savedMoviePage.innerHTML += `
                    <div key=${single.imdbID}>
                        <div class="movies">
                            <img src=${single.Poster} alt="poster" class="movie--img" />
                            <div class="movie-info">
                                <div class="title">
                                    <h3>${single.Title}</h3>
                                    <div class="star">
                                        <img src="images/star.png" alt="start"/>
                                        <h4>${single.imdbVotes}</h4>
                                    </div>
                                </div>
                                <div class="movie-meta-data">
                                    <p>${single.Runtime}</p>
                                    <p>${single.Genre}</p>
                                    <div class="add-movie">
                                        <img src="images/remove.png" id="add" data-id-to-add="${single.imdbID}"/>
                                        <p>Remove</p>
                                    </div>
                                </div>
                                <p>${single.Plot}</p>
                            </div>
                        </div>
                        <div class="line"/>
                    </div>
                    `;
  } catch (error) {
    console.log(error);
  }
};

export {
  renderMovie,
  getMovieId,
  addToWatchlist,
  renderWatchlist,
  deleteToWatchlist,
};
