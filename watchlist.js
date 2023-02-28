import { deleteToWatchlist, renderWatchlist, } from "./features.js";

const savedMoviePage = document.getElementById("root");
let myList = JSON.parse(localStorage.getItem("MyMovies"))


// console.log(myList)
if(myList.length > 0){
    savedMoviePage.innerHTML = ""
}
document.addEventListener("click", function (e) {
    if(e.target.id == "add"){
        e.preventDefault();
        const movieToDelete = e.target.dataset.idToAdd;
        deleteToWatchlist(movieToDelete);
      }
  });
  
myList.map( movie  => {
    renderWatchlist(movie)
})