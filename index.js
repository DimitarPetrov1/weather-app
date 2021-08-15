import { KEY, selectedLocation } from "./src/data.js";
import { astroInfo } from "./hourly.js";
// current stats in the location

let mainPanelLocation = document.getElementById("mainPanelLocation");
let mainPanelTemperature = document.getElementById("mainPanelTemperature");
let mainPanelFeelsLike = document.getElementById("mainPanelFeelsLike");
let weatherDescription = document.getElementById("weatherDescription");
let mainPanelImg = document.getElementById("mainPanelImg");
let windSpeed = document.getElementById("windSpeed");
let winDirection = document.getElementById("winDirection");
let cloudsSky = document.getElementById("cloudsSky");
let humidity = document.getElementById("humidity");
let currentUV = document.getElementById("currentUV");
let lastUpdated = document.getElementById("lastUpdated");

const fetchLocation = async () => {
  await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${selectedLocation}`
  )
    .then((response) => response.json())
    .then((data) => {
      mainPanelLocation.textContent = data.location.name;
      mainPanelTemperature.textContent = data.current.temp_c + "°C";
      mainPanelFeelsLike.textContent = data.current.feelslike_c + "°C";
      weatherDescription.textContent = data.current.condition.text;
      mainPanelImg.src = data.current.condition.icon;
      windSpeed.textContent = data.current.wind_kph + " km/h";
      winDirection.textContent = data.current.wind_dir;
      cloudsSky.textContent = data.current.cloud + "%";
      humidity.textContent = data.current.humidity + "%";
      currentUV.textContent = "UV: " + data.current.uv;
      lastUpdated.textContent = "Last updated: " + data.current.last_updated;
    })
    .catch((err) => console.log(err));
};

fetchLocation();
