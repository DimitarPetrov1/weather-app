import { KEY, selectedLocation } from "./src/data.js";

function createTemplate(id, time, img, temp) {
  let template = document.createElement("div");
  template.setAttribute("name", `h-${id}`);
  let p1 = document.createElement("p");
  let p2 = document.createElement("img");
  let p3 = document.createElement("p");

  template.classList.add("hourly-card", "panel-small");

  p1.classList.add("hourlyCardTime");
  p1.textContent = time;
  template.appendChild(p1);

  p2.classList.add("hourlyCardImg");
  p2.setAttribute("src", img);
  p2.setAttribute("alt", "weather picture");
  template.appendChild(p2);

  p3.classList.add("hourlyCardTemp");
  p3.textContent = temp;
  template.appendChild(p3);

  return template;
}

let hourlyTarget = document.querySelector(".hourly-wrap");
let astroInfo = [];
let changeOfRain = document.getElementById("changeOfRain");

function getCurrentHour() {
  let today = new Date();
  let curretHour = today.getHours();
  return Number(curretHour);
}

const fetchHourly = async () => {
  let hourlyTime = [];
  let hourlyImg = [];
  let hourlyTemp = [];
  await fetch(
    `http://api.weatherapi.com/v1/history.json?key=${KEY}&q=${selectedLocation}&dt=2021-08-15`
  )
    .then((response) => response.json())
    .then((data) => {
      let i = 0;
      while (i < 24) {
        hourlyTime.push(
          data.forecast.forecastday[0].hour[i].time.slice(10, 16)
        );
        hourlyImg.push(data.forecast.forecastday[0].hour[i].condition.icon);
        hourlyTemp.push(data.forecast.forecastday[0].hour[i].temp_c + "°C");

        // astro below
        astroInfo.push(data.forecast.forecastday[0].astro);
        if (i >= getCurrentHour()) {
          hourlyTarget.appendChild(
            createTemplate(i, hourlyTime[i], hourlyImg[i], hourlyTemp[i])
          );
          // maybe needs looking into
          changeOfRain.textContent =
            data.forecast.forecastday[0].hour[i].chance_of_rain + "%";
        }
        i++;
      }
    })
    .catch((err) => console.log(err));
};

fetchHourly();

export { astroInfo };
