function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  /*
  if (hours == 18) {
    document.getElementById("weekTemperature").style.background = "#4F8A8C";
  }
  */

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
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecastDayNightTemps(response) {
  console.log(response.data);
  let forecastDayTemps = response.data.daily[0].temp.day;
  let forecastNightTemps = response.data.daily[0].temp.night;

  let forecastDayNightTempsElement = document.querySelector("#dayNightInfo");

  let forecastDayNightTempsHTML = `<span class="dayNightTemp" id="dayNightTemp">
    Day ${Math.round(forecastDayTemps)}° | Night ${Math.round(
    forecastNightTemps
  )}° 
  </span>`;

  forecastDayNightTempsHTML = forecastDayNightTempsHTML + `</div`;

  forecastDayNightTempsElement.innerHTML = forecastDayNightTempsHTML;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `
  <div class="card">
    <div class="card-body weekTemperature" id="weekTemperature">
      <div class="row">
      `;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          class="emojis"
          id="icon"
        >
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>/
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>

  `;
    }
  });

  forecastHTML = forecastHTML + `</div`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6390fb101c75df7252da79c7b69cf2fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(displayForecastDayNightTemps);
}

function temperatureInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureInfo");
  celsiusTemperature.classList.remove("btn-outline-primary");
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

  getForecast(response.data.coord);
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
  document.getElementById("myDiv").style.backgroundRepeat = "repeat";
  document.getElementById("myDiv").style.backgroundSize = "cover";
  document.getElementById("myDiv").style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/112/original/martin-kozon-jjqljdXMPZE-unsplash.jpg?1647126055')";

  // document.getElementById("myDiv1").style.backgroundPosition = "center";
  // document.getElementById("myDiv").style.backgroundRepeat = "repeat";
  // document.getElementById("myDiv1").style.backgroundSize = "cover";
  // document.getElementById("myDiv1").style.backgroundImage =
  //   "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/112/original/martin-kozon-jjqljdXMPZE-unsplash.jpg?1647126055')";
  document.getElementById("myImg").style.display = "none";
  document.getElementById("weekTemperature").style.background = "#3080a7";
}
function searchMadrid(event) {
  event.preventDefault();
  searchCity("Madrid");
}
function searchDubai(event) {
  event.preventDefault();
  searchCity("Dubai");
  // document.getElementById("myDiv").style.backgroundPosition = "center";
  // document.getElementById("myDiv").style.backgroundRepeat = "repeat";
  // document.getElementById("myDiv").style.backgroundSize = "cover";
  // document.getElementById("myDiv").style.backgroundImage =
  //   "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/112/original/martin-kozon-jjqljdXMPZE-unsplash.jpg?1647126055')";

  // document.getElementById("myDiv1").style.backgroundPosition = "center";
  // document.getElementById("myDiv").style.backgroundRepeat = "repeat";
  // document.getElementById("myDiv1").style.backgroundSize = "cover";
  // document.getElementById("myDiv1").style.backgroundImage =
  //   "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/113/original/darcey-beau-vtK31JoeAFk-unsplash_%281%29.jpg?1647127129')";
  // // document.getElementById("myDiv1").style.height = "400px";
  // // document.getElementById("myDiv1").style.width = "670px";
  // document.getElementById("myImg").style.display = "none";
  // document.getElementById("weekTemperature").style.background = "#3080a7";
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

// function changeImg() {
//   var image = document.getElementById("myImg");

//   if (image.src.match("images/weather_app.svg")) {
//     image.src = "images/Paris.jpg";
//     image = document.getElementById("myImg").style.height = "500px";
//     image = document.getElementById("myImg").style.width = "470px";
//   } else {
//     image.src = "images/weather_app.svg";
//   }
// }

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
