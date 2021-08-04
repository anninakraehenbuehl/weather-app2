//Feaatures1

function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`; //weil wert ansonsten ohne 0 dargestellt wird
  }

  let minute = date.getUTCMinutes();
  if (minute < 10) {
    minute = `0${minute}`; //weil wert
  }

  let daysIndex = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = daysIndex[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

let date2 = document.querySelector("#date2");
let date = new Date();

date2.innerHTML = formatDate(date);

function displayWeatherCondition(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "0b43335faea14af206bd0ff4d9a5551e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Features 2 > make API-call to OpenWeather API > then when get HTTP response, we display city name + temp.
function handleSubmit(event) {
  event.preventDefault(); //verhindert aktualisierung der seite, nach klicken auf button
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "0b43335faea14af206bd0ff4d9a5551e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

// AUSKOMMENTIEREN MIT STRG + K + C //entfernen mit STRG + K + U
