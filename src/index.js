function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min">| ${Math.round(
                forecastDay.temp.min
              )}° </span>
           </div>
        </div>
`;
    }
  });
  forecast = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9de1490b29fb07378627d7765d3f1054";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  temperature.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

let apiKey = "9de1490b29fb07378627d7765d3f1054";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayWeather);

function search(city) {
  let apiKey = "9de1490b29fb07378627d7765d3f1054";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#question");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
