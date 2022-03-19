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
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecastDayNightTemps(response) {
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
            )}°</span>
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

  if (city == "London") {
    searchLondon(event);
  }
  if (city == "Madrid") {
    searchMadrid(event);
  }
  if (city == "Paris") {
    searchParis(event);
  }
  if (city == "Dubai") {
    searchDubai(event);
  }
  if (city == "Chicago") {
    searchChicago(event);
  } else if (city == "") {
    alert("Please type a city!");
  } else {
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundImage = document.body.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/447/original/alessio-soggetti-cfKC0UOZHJo-unsplash.jpg?1647480104')";
    document.getElementById("sourceCode").style.color = "white";
    document.getElementById("textLink").style.color = "#3bd4df";
    document.getElementById("textBox").style.backgroundColor = "#2D5D7B";
  }
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
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundImage = document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/447/original/alessio-soggetti-cfKC0UOZHJo-unsplash.jpg?1647480104')";
  document.getElementById("sourceCode").style.color = "white";
  document.getElementById("textLink").style.color = "#3bd4df";
  document.getElementById("textBox").style.backgroundColor = "#2D5D7B";
}

// Cities Searches
function searchLondon(event) {
  event.preventDefault();
  searchCity("London");
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "38%";
  document.body.style.backgroundImage = document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/108/original/henry-be-MdJq0zFUwrw-unsplash.jpg?1647125650')";
  document.getElementById("sourceCode").style.color = "white";
  document.getElementById("textLink").style.color = "#3bd4df";
  document.getElementById("textBox").style.backgroundColor = "white";
}
function searchMadrid(event) {
  event.preventDefault();
  searchCity("Madrid");
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "38%";
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/015/original/jordi-moncasi-rZwGJrkYFFY-unsplash.jpg?1647044778')";
  document.getElementById("sourceCode").style.color = "white";
  document.getElementById("textBox").style.backgroundColor = "#2D5D7B";
}
function searchDubai(event) {
  event.preventDefault();
  searchCity("Dubai");
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "38%";
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/113/original/darcey-beau-vtK31JoeAFk-unsplash_%281%29.jpg?1647127129')";
  document.getElementById("sourceCode").style.color = "white";
  document.getElementById("textBox").style.backgroundColor = "#2D5D7B";
}
function searchParis(event) {
  event.preventDefault();
  searchCity("Paris");
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "40%";
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/028/879/original/anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg?1646848904')";
  document.getElementById("sourceCode").style.color = "white";
  document.getElementById("textBox").style.backgroundColor = "#2D5D7B";
}
function searchChicago(event) {
  event.preventDefault();
  searchCity("Chicago");
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "45%";
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/029/440/original/sawyer-bengtson-tnv84LOjes4-unsplash.jpg?1647477316')";
  document.getElementById("sourceCode").style.color = "white";
  document.getElementById("textBox").style.backgroundColor = "#2D5D7B";
}

let clickLondon = document.querySelector("#london");
clickLondon.addEventListener("click", searchLondon);

let clickMadrid = document.querySelector("#madrid");
clickMadrid.addEventListener("click", searchMadrid);

let clickDubai = document.querySelector("#dubai");
clickDubai.addEventListener("click", searchDubai);

let clickParis = document.querySelector("#paris");
clickParis.addEventListener("click", searchParis);

let clickChicago = document.querySelector("#chicago");
clickChicago.addEventListener("click", searchChicago);

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
let searchIconButton = document.querySelector("#search-icon-button");
searchIconButton.addEventListener("click", submitEvent);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Lisbon");
