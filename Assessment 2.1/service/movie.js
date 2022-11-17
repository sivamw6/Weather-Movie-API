const APIKey = "b20f768bbbe65352a8953334208b980e";
const APIURL = `
https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKey}`;
const imgBaseURL = "https://image.tmdb.org/t/p/w500";

const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");
const movieTitle = document.getElementById("movieTitle");
const movieImage = document.getElementById("movieImage");
const movieText = document.getElementById("movieText");
const movieCard = document.getElementById("movieCard");

const carouselImgs = document.getElementsByClassName("carouselImg");
const carouselInner = document.getElementById("carousel-inner");
console.log(carouselInner);

const checkButtons = document.getElementsByClassName("check-btn");
const nextButtons = document.getElementById("next-btn");
const form = document.getElementById("form");

let target = null;

for (let i = 0; i < checkButtons.length; i++) {
  checkButtons[i].addEventListener("click", checkHandler);
}

window.addEventListener("load", loadData);

errorMessage.style.display = "none";
movieCard.style.display = "none";

searchButton.addEventListener("click", search);
nextButtons.addEventListener("click", clickHandler);

function search() {
  const query = searchBox.value;
  searchMovie(query);
}

async function searchMovie(query) {
  try {
    if (query === "") {
      throw new Error("Search text can not be empty!");
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie/?api_key=${APIKey}&query=${query}`
    );
    const data = await response.json();
    displaySearch(data);
  } catch (error) {
    errorDisplay(error);
  }
}

async function loadData() {
  try {
    const response = await fetch(APIURL);
    const data = await response.json();
    console.log(data);
    displayMovie(data);
  } catch (error) {
    errorDisplay(error);
  }
}

function displaySearch(data) {
  searchDisplay(data);
  let content = data.results
    .filter((item, index) => index < 5)
    .map((item, index) => {
      return `<div class="card" style="width: 18rem">
      <img id="movieImage" src="${imgBaseURL}${item.poster_path}" class="card-img-top" />
      <div class="card-body">
        <h2 class="card-title" id="movieTitle">${item.title}</h2>
        <h5>${item.vote_average}</h5>
        <p class="card-text" id="movieText">
          ${item.overview}
        </p>
      </div>
    </div>`;
    })
    .join("");

  movieCard.style.display = data.results.length === 0 ? "none" : "block";
  movieCard.innerHTML = content;
}

function displayMovie(data) {
  let content = data.results
    .filter((item, index) => index < 11)
    .map((item, index) => {
      return `<div class="carousel-item ${index === 0 && "active"}">
      <img class="d-block w-50 carouselImg mx-auto" src="${imgBaseURL}${
        item.poster_path
      }" />
      <div class="carousel-caption d-none d-md-block">
      <div class="container">
      <h2>${item.title}</h2>
      <h5>${item.vote_average}</h5>
      <p>
        ${item.overview}
      </p>
      </div>
      </div>
    </div>`;
    })
    .join("");
  carouselInner.innerHTML = content;
}

function searchDisplay(data) {
  if (data.Error) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = data.Error;
    console.log(data.Error);
  } else {
    movieCard.style.display = "block";
    errorMessage.style.display = "none";
    movieTitle.innerHTML = data.Title;
    if (data.poster_path == "N/A") {
      movieImage.src = `${imgBaseURL}${img}`;
    } else {
      movieImage.src = data.poster_path;
    }
    movieText.innerHTML = data.overview;
  }
}

function errorDisplay(error) {
  errorMessage.style.display = "block";
  errorMessage.innerHTML = error;
  console.log(error);
}



function checkHandler(e) {
  nextButtons.disabled = false;
  if (e.target.value === "1") {
    target = "./food.html";
  }
  if (e.target.value === "2") {
    target = null;
  }
}

function clickHandler(e) {
  e.preventDefault();
  if (!target) {
    alert("Sounds great! Go to enjoy your day!");
    window.location.href = "./contact.html";
  } else {
    window.location.href = target;
  }
}