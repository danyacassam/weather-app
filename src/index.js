function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function temperatureInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureInfo");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°F";
}

function temperatureInCelsius(event) {
  event.preventDefault();
  var temperatureElement = document.querySelector("#temperatureInfo");
  temperatureElement.innerHTML = Math.round(celsiusTemp) + "°C";
}

function displayWeather(response) {
  document.querySelector("#cityElement").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperatureInfo").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + "km/h";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  var apiKey = "6390fb101c75df7252da79c7b69cf2fe";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeather);
}

function submitEvent(event) {
  event.preventDefault();
  var city = document.querySelector("#searchCityInput").value;
  searchCity(city);
}

function searchLocation(position) {
  var apiKey = "6390fb101c75df7252da79c7b69cf2fe";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Cities Searches
function searchLondon(event) {
  event.preventDefault();
  searchCity("London");
  document.getElementById("myDiv").style.backgroundPosition = "center";
  //document.getElementById("myDiv").style.backgroundRepeat = "repeat";
  //document.getElementById("myDiv").style.backgroundSize = "cover";
  document.getElementById("myDiv").style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/017/original/massimiliano-morosinotto-paINk01G8Xk-unsplash.jpg?1647045110')";

  document.getElementById("myDiv1").style.backgroundPosition = "center";
  //document.getElementById("myDiv").style.backgroundRepeat = "repeat";
  document.getElementById("myDiv1").style.backgroundSize = "cover";
  document.getElementById("myDiv1").style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/017/original/massimiliano-morosinotto-paINk01G8Xk-unsplash.jpg?1647045110')";

  document.getElementById("weekTemperature").style.background = "orange";
}
function searchMadrid(event) {
  event.preventDefault();
  searchCity("Madrid");
}
function searchDubai(event) {
  event.preventDefault();
  searchCity("Dubai");
}
function searchAbuDhabi(event) {
  event.preventDefault();
  searchCity("AbuDhabi");
}
function searchGeneva(event) {
  event.preventDefault();
  searchCity("Geneva");
}

let clickLondon = document.querySelector("#london");
clickLondon.addEventListener("click", searchLondon);

/*
function changeImg() {
  var image = document.getElementById("myImg");
  if (image.src.match("images/weather_app.svg")) {
    image.src = "images/Paris.jpg";
  } else {
    image.src = "images/weather_app.svg";
  }
}
*/

let clickMadrid = document.querySelector("#madrid");
clickMadrid.addEventListener("click", searchMadrid);

let clickDubai = document.querySelector("#dubai");
clickDubai.addEventListener("click", searchDubai);

let clickAbuDhabi = document.querySelector("#abuDhabi");
clickAbuDhabi.addEventListener("click", searchAbuDhabi);

let clickGenava = document.querySelector("#geneva");
clickGenava.addEventListener("click", searchGeneva);

let fahrenheitTemperature = document.querySelector("#fahrenheitButton");
fahrenheitTemperature.addEventListener("click", temperatureInFahrenheit);
let celsiusTemperature = document.querySelector("#celsiusButton");
celsiusTemperature.addEventListener("click", temperatureInCelsius);

let celsiusTemp = null;

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitEvent);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Lisbon");
