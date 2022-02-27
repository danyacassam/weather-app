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
  var temperatureElement = document.querySelector("#temperatureInfo");
  temperatureElement.innerHTML = 59 + "°F";
}

function temperatureInCelsius(event) {
  event.preventDefault();
  var temperatureElement = document.querySelector("#temperatureInfo");
  temperatureElement.innerHTML = 15 + "°C";
}

function displayWeather(response) {
  document.querySelector("#cityElement").innerHTML = response.data.name;
  document.querySelector("#temperatureInfo").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + "km/h";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

let fahrenheitTemperature = document.querySelector("#fahrenheitButton");
fahrenheitTemperature.addEventListener("click", temperatureInFahrenheit);
let celsiusTemperature = document.querySelector("#celsiusButton");
celsiusTemperature.addEventListener("click", temperatureInCelsius);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitEvent);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Lisbon");
