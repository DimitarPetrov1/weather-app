import { KEY, selectedLocation } from "./src/data.js";

let getWeeklyForecast = [];

let thermometer = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`;

function createTemplate(input) {
  let template = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("img");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");
  let p5 = document.createElement("span");
  let line = document.createElement("div");
  line.classList.add("line-small");

  template.classList.add("weekly-card", "panel-small");

  // p1.classList.add("weeklyCardTime");
  p1.textContent = input[0];
  template.appendChild(p1);

  p2.classList.add("weekly-card__img");
  p2.setAttribute("src", input[1]);
  p2.setAttribute("alt", "weather picture");
  template.appendChild(p2);

  // p3.classList.add("weeklyCardTemp");
  p3.textContent = input[2];
  template.appendChild(p3);
  template.appendChild(line);

  // p3.classList.add("weeklyCardTemp");
  p5.innerHTML = `
  <div class='weekly-card__info'>
      <div class='weekly-card__info-inner'>${thermometer}max: ${input[3]}°C</div>
      <div class='weekly-card__info-inner'>${thermometer}max: ${input[4]}°C</div>
  </div>
  `;
  template.appendChild(p5);

  return template;
}

let weeklyTarget = document.querySelector(".weekly-wrap");

const fetchWeekly = async () => {
  let weeklyTime = [];
  let weeklyImg = [];
  let weeklyTemp = [];
  await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${selectedLocation}&days=7&aqi=no&alerts=no`
  )
    .then((response) => response.json())
    .then((data) => {
      getWeeklyForecast.push(...data.forecast.forecastday);
    })
    .catch((err) => console.log(err));

  getWeeklyForecast.map((i) => {
    weeklyTarget.append(
      createTemplate([
        i.date.slice(5),
        i.day.condition.icon,
        i.day.condition.text,
        i.day.maxtemp_c,
        i.day.mintemp_c,
      ])
    );
  });
  let first = document.querySelector(".weekly-card");
  first.firstChild.textContent = "Today";
  if (first.nextSibling.nextSibling.firstChild !== null) {
    first.nextSibling.firstChild.textContent = "Tomorrow";
  } else {
    return null;
  }
};
fetchWeekly();

// i.astro.moon_illumination
