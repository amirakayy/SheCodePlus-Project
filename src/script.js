let rightNow = new Date();
let date = rightNow.getDate();
let hours = rightNow.getHours();
let minutes = rightNow.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[rightNow.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[rightNow.getMonth()];

let changeTitle = document.querySelector(".card-title");
changeTitle.innerHTML = `Today is ${month} ${date} ${day} , it is ${hours}:${minutes}`;

function displayForcast(response) {
  console.log(response.data.daily);
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `  <div class="col-3">
   <div class="weather-forcast-date">${day}</div>
          <img
            src="https://openweathermap.org/img/wn/01d@2x.png"
            alt="weather"
            width="36"
          />
          <br />
          <div class="weather-forcast-temperature">
            <span class="forcast-temperature-max"> 18°C </span> /
            <span class="forcast-temperature-min"> 12°C </span>
          </div>
               </div>
               `;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
function afterTemperatureIsFetched(response) {
  let cityName = response.data.name;
  let replaceCity = document.querySelector(".card-header");
  replaceCity.innerHTML = cityName;
  let fullreport = document.querySelector("#fullReport");
  fullreport.innerHTML = ` ${response.data.weather[0].description} <br>
  it feels like ${Math.round(response.data.main.feels_like)}°C <br>
  humidity is ${response.data.main.humidity}% <br> 
  the wind speed is ${response.data.wind.speed}MPH <br>
  the visibility is ${response.data.visibility} meters <br>`;
  let iconElement = document.querySelector("#updateIcon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  
  function replaceTemperature(temperature, cssClass) {
    let roundTemperature = Math.round(temperature);
    let replaceHeading = document.querySelector(cssClass);
    replaceHeading.innerHTML = `${roundTemperature}°C`;
    celsiusTemperatureHigh = response.data.main.temp_max;
    celsiusTemperatureLow = response.data.main.temp_min;
    console.log(response.data.main);
  }
  replaceTemperature(response.data.main.temp_max, ".temperatureHigh");
  replaceTemperature(response.data.main.temp_min, ".temperatureLow");

  function fourDayForcast(coords) {
    let apiKey = "82388213c576612f9da26f93f68c7b2b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForcast);
  } fourDayForcast(response.data.coord);
}

function afterSearchSubmitted(event) {
  event.preventDefault();
  let cityName = document.querySelector("input").value;
  console.log(cityName);
  let replaceCity = document.querySelector(".card-header");
  replaceCity.innerHTML = cityName;

  let apiKey = "82388213c576612f9da26f93f68c7b2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(afterTemperatureIsFetched);
}
let form = document.querySelector(".formOne");
form.addEventListener("submit", afterSearchSubmitted);

function afterCurrentLocationSubmitted(event) {
  event.preventDefault();
  console.log(event);
  function afterLocationFetched(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKeyAgain = "82388213c576612f9da26f93f68c7b2b";
    let apiUrlAgain = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeyAgain}`;
    axios.get(apiUrlAgain).then(afterTemperatureIsFetched);
  }
  navigator.geolocation.getCurrentPosition(afterLocationFetched);
}
let formTwo = document.querySelector(".formTwo");
formTwo.addEventListener("submit", afterCurrentLocationSubmitted);

let celsiusTemperatureHigh = null;
let celsiusTemperatureLow = null;

function conversionEquation(event) {
  let highTemperature = document.querySelector(".temperatureHigh");
  let lowTemperature = document.querySelector(".temperatureLow");

  let convertToFahrenheit = event.srcElement.checked;
  if (convertToFahrenheit) {
    let imperialTemperatureEquation = (celsiusTemperatureHigh * 9) / 5 + 32;
    imperialTemperature = Math.round(imperialTemperatureEquation);
    highTemperature.innerHTML = ` ${imperialTemperature}°F`;
    let imperialTemperatureEquationLow = (celsiusTemperatureLow * 9) / 5 + 32;
    imperialTemperatureLow = Math.round(imperialTemperatureEquationLow);
    lowTemperature.innerHTML = ` ${imperialTemperatureLow}°F`;
  } else {
    imperialTemperature = Math.round(celsiusTemperatureHigh);
    highTemperature.innerHTML = ` ${imperialTemperature}°C`;
    imperialTemperatureLow = Math.round(celsiusTemperatureLow);
    lowTemperature.innerHTML = ` ${imperialTemperatureLow}°C`;
  }
}

let convert = document.querySelector("#flexSwitchCheckDefault");
convert.addEventListener("click", conversionEquation);
