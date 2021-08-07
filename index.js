import { KEY } from "./src/data.js";
let enteredLocation = "Plovdiv";
// current stats in the location

let mainPanelLocation = document.getElementById("mainPanelLocation");
let mainPanelTemperature = document.getElementById("mainPanelTemperature");
let mainPanelFeelsLike = document.getElementById("mainPanelFeelsLike");
let weatherDescription = document.getElementById("weatherDescription");
let mainPanelImg = document.getElementById("mainPanelImg");
let windSpeed = document.getElementById("windSpeed");
let winDirection = document.getElementById("winDirection");
let changeOfRain = document.getElementById("changeOfRain");
let cloudsSky = document.getElementById("cloudsSky");
let humidity = document.getElementById("humidity");
let currentUV = document.getElementById("currentUV");
let lastUpdated = document.getElementById("lastUpdated");

const fetchLocation = async () => {
  await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${enteredLocation}`
  )
    .then((response) => response.json())
    .then(
      // (data) => (
      //   (currentInLocation.name = data.location.name),
      //   (currentInLocation.country = data.location.country),
      //   (currentInLocation.localTime = data.location.localtime),
      //   (currentInLocation.currentTemp = data.current.temp_c),
      //   (currentInLocation.lastUpdated = data.current.last_updated),
      //   (currentInLocation.currentText = data.current.condition.text),
      //   (currentInLocation.currentIconForText = data.current.condition.icon)
      // )
      (data) => {
        mainPanelLocation.textContent = data.location.name;
        mainPanelTemperature.textContent = data.current.temp_c;
        mainPanelFeelsLike.textContent = data.current.feelslike_c;
        weatherDescription.textContent = data.current.condition.text;
        mainPanelImg.src = data.current.condition.icon;
        windSpeed.textContent = data.current.wind_kph + " km/h";
        winDirection.textContent = data.current.wind_dir;
        cloudsSky.textContent = data.current.cloud + "%";
        humidity.textContent = data.current.humidity + "%";
        currentUV.textContent = "UV: " + data.current.uv;
        lastUpdated.textContent = "Last updated: " + data.current.last_updated;
        console.log(data);
      }
    )
    .catch((err) => console.log(err));
};

fetchLocation();
