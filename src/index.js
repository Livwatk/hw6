function timeNow(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
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

  return `${day} ${hours}: ${minutes}`;
}

//location
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let apiKey = "bd3b19ae6eda7b41ce3eb2fcab694e1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function sumbitAction(event) {
  event.preventDefault();
  let city = document.querySelector("#search-question").value;
  searchCity(city);
}

//currentLocation
function locationPosition(postition) {
  let apiKey = "bd3b19ae6eda7b41ce3eb2fcab694e1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${postion.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationPosition);
}

let time = document.querySelector("#time");
let now = new Date();
time.innerHTML = timeNow(now);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", sumbitAction);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
searchCity("Paris");
