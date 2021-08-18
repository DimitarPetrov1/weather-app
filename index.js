import { preferedUnitsTemp, preferredUnitsSpeed } from "./src/data.js";
let current = JSON.parse(localStorage.getItem("current"));
let data = JSON.parse(localStorage.getItem("data"));

let IMG_icon = current.weather[0].icon;
let URL_image = `http://openweathermap.org/img/wn/${IMG_icon}@2x.png`;

let template = `
  <div class="main-panel panel-large">
  <div class="main-panel__top">
    <div class="main-panel__top-left">
      <p id="mainPanelLocation">${current.name}</p>
      <img id="mainPanelImg" src='${URL_image}' alt="Weather icon" />
    </div>
    <div class="main-panel__top-right">
      <p id="mainPanelTemperature">${
        current.main.temp.toString().slice(0, -3) + preferedUnitsTemp
      }</p>
      <div class="main-panel__text">${current.weather[0].description}</div>
      <div class="main-panel__text">
        Feels like ${current.main.feels_like + preferedUnitsTemp}</span>
      </div>
    </div>
  </div>
  <div class="line" /></div>
  <div class="main-panel__bottom">
    <div class="main-panel__bottom-left main-panel__text">
      <div class="main-panel__small-row">
        <div class="main-panel__small-row-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
            ></path>
          </svg>
          <div id="windSpeed">${
            data.current.wind_speed + preferredUnitsSpeed
          }</div>
        </div>
        <div class="devider">|</div>
        <div class="main-panel__small-row-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            ></polygon>
          </svg>
          <div id='winDirection'></div>
        </div>
      </div>
      <div class="main-panel__small-row">
        <div class="main-panel__small-row-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"
            ></path>
          </svg>
          <div id='changeOfRain'></div>
        </div>
        <div class="devider">|</div>
        <div class="main-panel__small-row-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
            ></path>
          </svg>
          <div id='cloudsSky'></div>
        </div>
      </div>
    </div>
    <div class="main-panel__bottom-right main-panel__text">
      <div class="main-panel__small-row-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
        <div id="humidity">${current.main.humidity}</div>
      </div>
      <div class="main-panel__small-row-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <div id="currentUV"></div>
      </div>
    </div>
  </div>
  <div id="lastUpdated"></div>
  </div>
  `;

let targetCurrent = document.getElementById("targetCurrent");
targetCurrent.innerHTML = template;
