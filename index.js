import {
  thermometerSvg,
  windspeedSvg,
  cloudSvg,
  humiditySvg,
  sunSvg
} from "./src/svgs.js";
const KEY = "d48013e265168c93a3145b9c87869f29";
let searchOpen = false;
let menuOpen = false;

let metricUnits = "metric";
let preferedUnitsTemp = "°C";
let preferredUnitsSpeed = " km/h";

const userOptions = document.getElementById("userOptions");
const targetCurrent = document.getElementById("targetCurrent");
const phoneWrap = document.querySelector(".phone-wrap");
const hourlyTarget = document.querySelector(".hourly-wrap");
const dailyTarget = document.querySelector(".weekly-wrap");
const serachWrap = document.querySelector(".serach-wrap");
const startSearch = document.getElementById("startSearch");
const topSearchField = document.getElementById("topSearch");

const themeCheckboxes = document.querySelectorAll(".theme-checkbox");
const langCheckboxes = document.querySelectorAll(".lang-checkbox");

const checkLC = () => {
  let isDark = localStorage.getItem("theme-dark");
  let activeLang = localStorage.getItem("lang");
  if (isDark === "true") {
    phoneWrap.classList.add("theme-dark");
    themeCheckboxes[1].checked = true;
  } else {
    phoneWrap.classList.remove("theme-dark");
    themeCheckboxes[0].checked = true;
  }
  if (activeLang === "bg") {
    langCheckboxes[1].checked = true;
  } else {
    langCheckboxes[0].checked = true;
  }
};
themeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.value === "dark") {
      phoneWrap.classList.add("theme-dark");
      localStorage.setItem("theme-dark", "true");
    } else {
      phoneWrap.classList.remove("theme-dark");
      localStorage.setItem("theme-dark", "false");
    }
  });
});
langCheckboxes.forEach((lang) => {
  lang.addEventListener("change", () => {
    if (lang.value === "bg") {
      localStorage.setItem("lang", "bg");
    } else {
      localStorage.setItem("lang", "en");
    }
  });
});

serachWrap.addEventListener("click", (e) => {
  e.preventDefault();
  if (!searchOpen) {
    topSearchField.focus();
    serachWrap.style.width = "calc(100% - 54px)";
    serachWrap.style.backgroundImage = "none";
    topSearchField.style.opacity = 1;
    startSearch.style.visibility = "visible";
    searchOpen = true;
  } else {
    topSearchField.blur();
    serachWrap.style.width = "44px";
    serachWrap.style.backgroundImage = "url(./src/img/search.svg)";
    topSearchField.value = "";
    topSearchField.style.opacity = 0;
    startSearch.style.visibility = "hidden";
    searchOpen = false;
  }
});

startSearch.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("default", topSearchField.value);
  fetchData();
});

userOptions.addEventListener("click", () => {
  const menuModal = document.querySelector(".menu-modal");
  if (!menuOpen) {
    menuModal.style.right = "0";
    menuOpen = true;
  } else {
    menuModal.style.right = "-200px";
    menuOpen = false;
  }
});

// data is fetched only from the local storage, we have a default if a user is new or local storage is empty
const fetchData = () => {
  let DATA = {};
  let lat = "";
  let lon = "";
  let city = "";

  async function fetchAll() {
    await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?&units=${metricUnits}&lang=${
        localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
      }&lat=${lat}&lon=${lon}&appid=${KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        DATA.city = city;
        DATA.feels_like = data.current.feels_like;
        DATA.temp = data.current.temp;
        DATA.curent_clouds = data.current.clouds;
        DATA.wind_speed = data.current.wind_speed;
        DATA.weather_main = data.current.weather[0].main;
        DATA.weather_desc = data.current.weather[0].description;
        DATA.weather_icon = data.current.weather[0].icon;
        DATA.hourly_data = data.hourly;
        DATA.daily_data = data.daily;
        DATA.current_humidity = data.current.humidity;
        DATA.current_uv = data.current.uvi;
      })
      .catch((err) => console.log(err));
    renderCurrentWeather(DATA);
    renderHourly(DATA);
    renderDaily(DATA);
  }
  async function fetchCurrent() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?&lang=&q=${
        localStorage.getItem("default")
          ? localStorage.getItem("default")
          : "London"
      }&appid=${KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        city = data.name;
        lat = data.coord.lat;
        lon = data.coord.lon;
      })
      .catch((err) => console.log(err));
    fetchAll();
  }
  fetchCurrent();
};

//
const renderCurrentWeather = (input) => {
  let IMG_icon = input.weather_icon;
  let URL_image = `http://openweathermap.org/img/wn/${IMG_icon}@2x.png`;
  let currentTemplate = `
  <div class="main-panel panel-large">
  <div class="main-panel__top">
    <div class="main-panel__top-left">
      <p id="mainPanelLocation">${
        localStorage.getItem("default")
          ? localStorage.getItem("default")
          : input.city
      }</p>
      <img id="mainPanelImg" src='${URL_image}' alt="Weather icon" />
    </div>
    <div class="main-panel__top-right">
      <p id="mainPanelTemperature">${
        Math.round(input.temp) + preferedUnitsTemp
      }</p>
      <div class="main-panel__text">${input.weather_desc}</div>
      <div class="main-panel__text">
        ${
          localStorage.getItem("lang") === "en" ? "Feels like" : "усеща се като"
        } ${Math.round(input.feels_like) + preferedUnitsTemp}
      </div>
    </div>
  </div>
  <div class="line" /></div>
  <div class="main-panel__bottom">
      <div class="main-panel__small-row-inner main-panel__text">
      ${windspeedSvg}
        <div>${input.wind_speed + preferredUnitsSpeed}</div>
      </div>
      <div class="main-panel__small-row-inner main-panel__text">
      ${cloudSvg}
        <div>${input.curent_clouds + "%"}</div>
      </div>
      <div class="main-panel__small-row-inner main-panel__text">
      ${humiditySvg}
        <div>${input.current_humidity + "%"}</div>
      </div>
      <div class="main-panel__small-row-inner main-panel__text">
      ${sunSvg}
        <div>${"UV: " + input.current_uv}</div>
      </div>
  </div>  
    <div id="lastUpdated"></div>
  </div>

  `;
  targetCurrent.innerHTML = currentTemplate;
};

//
const renderHourly = (input) => {
  let hours = [];
  function getCurrentHour() {
    let today = new Date();
    let curretHour = today.getHours();
    for (let i = 0; i < 24; i++) {
      if (curretHour < 23) {
        curretHour++;
      } else {
        curretHour = 0;
      }
      hours.push(curretHour);
    }
  }
  getCurrentHour();

  hourlyTarget.innerHTML = input.hourly_data.splice(0, 24).map((hour, i) => {
    return `
          <div class="hourly-card panel-small">
          <p class="hourly-card__time">${hours[i] + ":00"}</p>
              <img src=${`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} class="hourly-card__img"/>
              <p class="hourly-card__temp">${
                Math.round(hour.temp) + preferedUnitsTemp
              }</p>
          </div>
          `;
  });
};

//
const renderDaily = (input) => {
  dailyTarget.innerHTML = input.daily_data.map((date) => {
    return `
          <div class="weekly-card panel-small">
          <p class='weekly-card__date'></p>
          <img
              class="weekly-card__img"
              src='http://openweathermap.org/img/wn/${
                date.weather[0].icon
              }@2x.png'
              alt="weather picture"
          />
          <p class="weekly-card__description">${date.weather[0].description}</p>
          <div class="line-small"></div>
          <span>
              <div class="weekly-card__info">
                  <div class="weekly-card__info-inner">
                  ${thermometerSvg}max: ${Math.round(date.temp.max)}°C
                  </div>
                  <div class="weekly-card__info-inner">
                  ${thermometerSvg}min: ${Math.round(date.temp.min)}°C
                  </div>
                  <div class="weekly-card__info-inner">
                  ${windspeedSvg}${date.wind_speed + preferredUnitsSpeed}
                  </div>
                  <div class="weekly-card__info-inner">
                  ${humiditySvg}${date.humidity}
                  </div>
              </div>
          </span>
          </div>
  `;
  });
  let targets = document.querySelectorAll(".weekly-card__date");
  targets[0].textContent = "Today";
  targets[1].textContent = "Tomorrow";
  for (let i = 2; i < targets.length; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let D = d.toString().slice(0, 10);
    targets[i].textContent = D.replace(" ", ", ");
  }
};
checkLC();
fetchData();
