import {
  thermometerSvg,
  windspeedSvg,
  cloudSvg,
  humiditySvg,
  sunSvg,
} from "./src/svgs.js";
import {
  K,
  userOptions,
  targetCurrent,
  bodyWrap,
  phoneWrap,
  searchIcon,
  hourlyTarget,
  dailyTarget,
  serachWrap,
  startSearch,
  topSearchField,
  themeCheckboxes,
  langCheckboxes,
  unitsCheckboxes,
  menuModal,
} from "./src/vars.js";
document.addEventListener("DOMContentLoaded", () => {
  let searchOpen = false;
  let menuOpen = false;
  let units = "";
  let unitsTemp = "";
  let unitsSpeed = "";

  const handleUnits = () => {
    if (localStorage.getItem("units") === "imperial") {
      units = "imperial";
      unitsTemp = "°F";
    } else {
      units = "metric";
      unitsTemp = "°C";
    }

    if (localStorage.getItem("lang") === "bg") {
      if (localStorage.getItem("units") === "imperial") {
        unitsSpeed = " мили/ч";
      } else {
        unitsSpeed = " км/ч";
      }
    } else {
      if (localStorage.getItem("units") === "imperial") {
        unitsSpeed = " mph";
      } else {
        unitsSpeed = " km/h";
      }
    }
  };

  const checkLS = () => {
    let theme = localStorage.getItem("theme");
    let lang = localStorage.getItem("lang");
    let units = localStorage.getItem("units");
    if (theme === "dark") {
      bodyWrap.classList.add("theme-dark");
      phoneWrap.classList.add("theme-dark");

      themeCheckboxes[1].checked = true;
    } else {
      bodyWrap.classList.remove("theme-dark");
      phoneWrap.classList.remove("theme-dark");
      themeCheckboxes[0].checked = true;
    }
    if (lang === "bg") {
      langCheckboxes[1].checked = true;
    } else {
      langCheckboxes[0].checked = true;
    }
    if (units === "imperial") {
      unitsCheckboxes[1].checked = true;
    } else {
      unitsCheckboxes[0].checked = true;
    }
  };

  themeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      phoneWrap.classList.add(checkbox.value);
      localStorage.setItem("theme", checkbox.value);
      checkLS();
    });
  });

  langCheckboxes.forEach((lang) => {
    lang.addEventListener("change", () => {
      localStorage.setItem("lang", lang.value);
      handleUnits();
      fetchData();
    });
  });

  unitsCheckboxes.forEach((unit) => {
    unit.addEventListener("change", () => {
      localStorage.setItem("units", unit.value);
      handleUnits();
      fetchData();
    });
  });

  startSearch.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("default", topSearchField.value);
    fetchData();
  });

  serachWrap.addEventListener("click", (e) => {
    e.preventDefault();
    if (!searchOpen) {
      topSearchField.focus();
      serachWrap.style.width = "calc(100% - 54px)";
      searchIcon.style.opacity = 0;
      topSearchField.style.opacity = 1;
      startSearch.style.visibility = "visible";
      searchOpen = true;
    }
    if (menuOpen) {
      menuModal.style.right = "-240px";
      menuOpen = false;
    }
  });

  userOptions.addEventListener("click", () => {
    if (!menuOpen) {
      menuModal.style.right = "0";
      menuOpen = true;
    }
    if (searchOpen) {
      topSearchField.blur();
      serachWrap.style.width = "44px";
      searchIcon.style.opacity = 1;
      topSearchField.value = "";
      topSearchField.style.opacity = 0;
      startSearch.style.visibility = "hidden";
      searchOpen = false;
    }
  });

  const closeSearch = () => {
    topSearchField.blur();
    serachWrap.style.width = "44px";
    searchIcon.style.opacity = 1;
    topSearchField.value = "";
    topSearchField.style.opacity = 0;
    startSearch.style.visibility = "hidden";
    searchOpen = false;
  };

  document.getElementById("targets").addEventListener("click", () => {
    if (menuOpen) {
      menuModal.style.right = "-240px";
      menuOpen = false;
    } else if (searchOpen) {
      closeSearch();
    }
  });

  // data is fetched only from the local storage, we have a default if a user is new or local storage is empty
  const fetchData = () => {
    let DATA = {
      city: undefined,
      feels_like: undefined,
      temp: undefined,
      curent_clouds: undefined,
      wind_speed: undefined,
      weather_main: undefined,
      weather_main: undefined,
      weather_desc: undefined,
      weather_icon: undefined,
      hourly_data: undefined,
      daily_data: undefined,
      current_humidity: undefined,
      current_uv: undefined,
    };
    let lat = "";
    let lon = "";
    let city = "";

    const fetchAll = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?&units=${units}&lang=${
          localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
        }&lat=${lat}&lon=${lon}&appid=${K}`
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
      if (DATA.temp !== undefined) {
        renderCurrentWeather(DATA);
        renderHourly(DATA);
        renderDaily(DATA);
      }
    };
    const fetchCurrent = async () => {
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?&lang=&q=${
          localStorage.getItem("default")
            ? localStorage.getItem("default")
            : "London"
        }&appid=${K}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          city = data.name;
          lat = data.coord.lat;
          lon = data.coord.lon;
          closeSearch();
        })
        .catch((err) => {
          console.log(err);
          alert("Location not found");
          localStorage.setItem("default", "London");
        });
      fetchAll();
    };
    fetchCurrent();
  };

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
        <p id="mainPanelTemperature">${Math.round(input.temp) + unitsTemp}</p>
        <div class="main-panel__text">${input.weather_desc}</div>
        <div class="main-panel__text">
          ${
            localStorage.getItem("lang") === "bg"
              ? "Усеща се като"
              : "Feels like"
          } ${Math.round(input.feels_like) + unitsTemp}
        </div>
      </div>
    </div>
    <div class="line" /></div>
    <div class="main-panel__bottom">
        <div class="main-panel__small-row-inner main-panel__text">
        ${windspeedSvg}
          <div>${input.wind_speed + unitsSpeed}</div>
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

  const renderHourly = (input) => {
    let hours = [];
    let headerText = document.getElementById("parHourly");
    if (localStorage.getItem("lang") === "bg") {
      headerText.textContent = "24-часова прогноза";
    } else {
      headerText.textContent = "24-hour forecast";
    }

    const getCurrentHour = () => {
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
    };
    getCurrentHour();

    hourlyTarget.innerHTML = input.hourly_data.splice(0, 24).map((hour, i) => {
      return `
            <div class="hourly-card panel-small">
            <p class="hourly-card__time">${hours[i] + ":00"}</p>
                <img src=${`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} class="hourly-card__img"/>
                <p class="hourly-card__temp">${
                  Math.round(hour.temp) + unitsTemp
                }</p>
            </div>
            `;
    });
  };

  const renderDaily = (input) => {
    let lang = localStorage.getItem("lang")
      ? localStorage.getItem("lang")
      : "en";
    let headerText = document.getElementById("parDaily");

    if (localStorage.getItem("lang") === "bg") {
      headerText.textContent = "8-дневна прогноза";
    } else {
      headerText.textContent = "8-day forecast";
    }

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
            <p class="weekly-card__description">${
              date.weather[0].description
            }</p>
            <div class="line-small"></div>
            <span>
                <div class="weekly-card__info">
                    <div class="weekly-card__info-inner">
                    ${thermometerSvg}
                    ${
                      localStorage.getItem("lang") === "bg" ? "макс: " : "max: "
                    }
                    ${Math.round(date.temp.max) + unitsTemp}
                    </div>
                    <div class="weekly-card__info-inner">
                    ${thermometerSvg}
                    ${localStorage.getItem("lang") === "bg" ? "мин: " : "min: "}
                    ${Math.round(date.temp.min) + unitsTemp}
                    </div>
                    <div class="weekly-card__info-inner">
                    ${windspeedSvg}${date.wind_speed + unitsSpeed}
                    </div>
                    <div class="weekly-card__info-inner">
                    ${humiditySvg}${date.humidity}%
                    </div>
                </div>
            </span>
            </div>
    `;
    });
    let targets = document.querySelectorAll(".weekly-card__date");
    if (localStorage.getItem("lang") === "bg") {
      targets[0].textContent = "Днес";
      targets[1].textContent = "Утре";
    } else {
      targets[0].textContent = "Today";
      targets[1].textContent = "Tomorrow";
    }

    for (let i = 2; i < targets.length; i++) {
      let d = new Date();
      targets[i].textContent = d.toLocaleDateString(
        lang + "-" + lang.toUpperCase()
      );
    }
  };
  handleUnits();
  checkLS();
  fetchData();
});
