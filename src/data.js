const KEY = "d48013e265168c93a3145b9c87869f29";

let selectedLocation = "london";
let preferedUnits = "units=metric";
let preferedUnitsTemp = "°C";
let preferredUnitsSpeed = " km/h";

let dataCurrent = [];
let dataAll = [];
let lat = "";
let lon = "";

const topSearch = document.getElementById("topSearch");
let searchOpen = false;
topSearch.addEventListener("click", (e) => {
  if (!searchOpen) {
    topSearch.focus();
    topSearch.style.width = "100%";
    topSearch.style.backgroundImage = "none";
    searchOpen = true;
  } else {
    topSearch.blur();
    topSearch.style.width = "44px";
    topSearch.style.backgroundImage = "url(./src/img/search.svg)";
    e.target.value = "";
    searchOpen = false;
  }
});

async function fetchAll() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?&${preferedUnits}&lat=${lat}&lon=${lon}&appid=${KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dataAll.push(data);
    })
    .catch((err) => console.log(err));
  localStorage.setItem("data", JSON.stringify(...dataAll));
}

async function fetchCurrent() {
  await fetch(
    `http://api.openweathermap.org/data/2.5/weather?&${preferedUnits}&q=${selectedLocation}&appid=${KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dataCurrent.push(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
    })
    .catch((err) => console.log(err));
  localStorage.setItem("current", JSON.stringify(...dataCurrent));

  fetchAll();

  console.log(selectedLocation);
}

fetchCurrent();

export { preferedUnitsTemp, preferredUnitsSpeed, fetchCurrent };
