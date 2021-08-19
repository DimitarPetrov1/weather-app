const KEY = "d48013e265168c93a3145b9c87869f29";
let searchOpen = false;

let defaultLocation = "sofia";
let preferedUnits = "units=metric";
let preferedUnitsTemp = "°C";
let preferredUnitsSpeed = " km/h";

const targetCurrent = document.getElementById("targetCurrent");
const hourlyTarget = document.querySelector(".hourly-wrap");
const dailyTarget = document.querySelector(".weekly-wrap");

let thermometer = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`;

const topSearch = document.getElementById("topSearch");

topSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (!searchOpen) {
    topSearch.focus();
    topSearch.style.width = "100%";
    topSearch.style.backgroundImage = "none";
    searchOpen = true;
  } else {
    topSearch.blur();
    topSearch.style.width = "44px";
    topSearch.style.backgroundImage = "url(./src/img/search.svg)";
    defaultLocation = e.target.value;
    topSearch.value = "";
    searchOpen = false;
    fetchData();
  }
});

const fetchData = () => {
  let DATA = {};
  let lat = "";
  let lon = "";

  async function fetchAll() {
    await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?&${preferedUnits}&lat=${lat}&lon=${lon}&appid=${KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        DATA.feels_like = data.current.feels_like;
        DATA.temp = data.current.temp;
        DATA.clouds = data.current.clouds;
        DATA.wind_speed = data.current.wind_speed;
        DATA.weather_main = data.current.weather[0].main;
        DATA.weather_desc = data.current.weather[0].description;
        DATA.weather_icon = data.current.weather[0].icon;
        DATA.hourly_data = data.hourly;
        DATA.daily_data = data.daily;
        DATA.current_humidity = data.current.humidity;
      })
      .catch((err) => console.log(err));
    renderCurrentWeather(DATA);
    renderHourly(DATA);
    renderDaily(DATA);
  }
  async function fetchCurrent() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?&${preferedUnits}&q=${defaultLocation}&appid=${KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
      <p id="mainPanelLocation">${defaultLocation}</p>
      <img id="mainPanelImg" src='${URL_image}' alt="Weather icon" />
    </div>
    <div class="main-panel__top-right">
      <p id="mainPanelTemperature">${
        Math.round(input.temp) + preferedUnitsTemp
      }</p>
      <div class="main-panel__text">${input.weather_desc}</div>
      <div class="main-panel__text">
        Feels like ${Math.round(input.feels_like) + preferedUnitsTemp}
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
          <div id="windSpeed">${input.wind_speed + preferredUnitsSpeed}</div>
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
        <div id="humidity">${input.current_humidity}</div>
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
  targetCurrent.innerHTML = currentTemplate;
};

//
const renderHourly = (input) => {
  function createTemplate(time, imgURL, temp) {
    let wrap = document.createElement("div");
    let p1 = document.createElement("p");
    let img = document.createElement("img");
    let p3 = document.createElement("p");

    wrap.classList.add("hourly-card", "panel-small");

    p1.classList.add("hourlyCardTime");
    p1.textContent = time;
    wrap.appendChild(p1);

    img.classList.add("hourlyCardImg");
    img.setAttribute("src", imgURL);
    img.setAttribute("alt", "weather picture");
    wrap.appendChild(img);

    p3.classList.add("hourlyCardTemp");
    p3.textContent = Math.round(temp) + preferedUnitsTemp;
    wrap.appendChild(p3.cloneNode(true));

    return wrap;
  }
  function getCurrentHour() {
    let today = new Date();
    let curretHour = today.getHours();
    return Number(curretHour);
  }
  // generate items in hourly
  let h = getCurrentHour();
  for (let i = 0; i < 24; i++) {
    if (h < 23) {
      h++;
    } else {
      h = 0;
    }
    hourlyTarget.appendChild(
      createTemplate(
        h + ":00",
        `http://openweathermap.org/img/wn/${input.hourly_data[i].weather[0].icon}@2x.png`,
        input.hourly_data[i].temp
      )
    );
  }
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
               ${thermometer}max: ${Math.round(date.temp.max)}°C
              </div>
              <div class="weekly-card__info-inner">
               ${thermometer}min: ${Math.round(date.temp.min)}°C
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
fetchData();
