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
function afterTemperatureIsFetched(response) {
  let cityName = response.data.name;
  let replaceCity = document.querySelector(".card-header");
  replaceCity.innerHTML = cityName;

  function replaceTemperature(temperature, cssClass) {
    let roundTemperature = Math.round(temperature);
    let replaceHeading = document.querySelector(cssClass);
    replaceHeading.innerHTML = `${roundTemperature}°C`;
  }
  replaceTemperature(response.data.main.temp_max, ".temperatureHigh");
  replaceTemperature(response.data.main.temp_min, ".temperatureLow");
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
