window.addEventListener("load", init);

const APIKey = "a29475858f55dff27b9623ccf9b658f2";

const searchBox = document.getElementById("searchBox");

const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const searchBtn = document.getElementById("searchBtn");
const locationTextBox = document.getElementById("locationTextBox");
const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const city = document.getElementById("city");
const userName = document.getElementById("userName");
const description = document.getElementById("description");
const checkButtons = document.getElementsByClassName("check-btn");
const nextButtons = document.getElementById("next-btn");
const form = document.getElementById("form");

let target = null;

// const descriptionFirst = description.charAt(0)
// const descriptionCap = description.toUppercase()
// const descriptionRemaining = description.slice(1)
// const description2 = descriptionCap + descriptionRemaining

for (let i = 0; i < checkButtons.length; i++) {
  checkButtons[i].addEventListener("click", checkHandler);
}

searchBtn.addEventListener("click", searchWeather);
nextButtons.addEventListener("click", clickHandler);

function init() {
  temp.style.display = "none";
  icon.style.display = "none";
  city.style.display = "none";
  description.style.display = "none";
  description.style.display = "none";
}

async function searchWeather() {
  const query = locationTextBox.value;
  const response = await fetch(
    `${baseURL}q=${query}&appid=${APIKey}&units=metric`
  );
  const data = await response.json();
  console.log(data);
  temp.innerHTML = data.main.temp + "°";
  city.innerHTML = data.name;
  description.innerHTML = data.weather[0].description;
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = "data.weather[0].description";
  icon.style.display = "inline";
  temp.style.display = "block";
  city.style.display = "block";
  description.style.display = "block";
}

function checkHandler(e) {
  nextButtons.disabled = false;
  if (e.target.value === "1") {
    target = "./movie.html";
  }
  if (e.target.value === "2") {
    target = null;
  }
}

function clickHandler(e) {
  e.preventDefault();
  if (!target) {
    alert("haha");
    window.location.href = "./contact.html";
  } else {
    window.location.href = target;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
if (!name) {
  window.location.href = "/";
}
userName.innerHTML = name
  .split("")
  .map((char, index) => {
    return index === 0 ? char.toUpperCase() : char;
  })
  .join("");
