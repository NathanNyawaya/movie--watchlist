import { addToWatchlist, getMovieId } from "./features.js";

const btn = document.getElementById("btn");
const movieInfo = document.getElementById("root");
let input = document.getElementById("movie");

btn.addEventListener("click", search);
function search() {
  movieInfo.innerHTML = "";
  getMovieId(input.value);
  console.log("fetching data...");
}

// add to watchlist
document.addEventListener("click", function (e) {
  if(e.target.id == "add"){
    e.preventDefault();
    const addText = e.target.nextElementSibling
    addText.innerHTML = "added"
    const movieToAdd = e.target.dataset.idToAdd;
    addToWatchlist(movieToAdd);
  }
});
