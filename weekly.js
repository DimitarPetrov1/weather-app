import { preferedUnitsTemp, preferredUnitsSpeed } from "./src/data.js";
let dailyTarget = document.querySelector(".weekly-wrap");
let data = JSON.parse(localStorage.getItem("data"));

let thermometer = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`;

dailyTarget.innerHTML = data.daily.map((date) => {
  let URL_image = `http://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`;

  return `
        <div class="weekly-card panel-small">
        <p class='weekly-card__date'></p>
        <img
            class="weekly-card__img"
            src='${URL_image}'
            alt="weather picture"
        />
        <p class="weekly-card__description">${date.weather[0].description}</p>
        <div class="line-small"></div>
        <span>
            <div class="weekly-card__info">
            <div class="weekly-card__info-inner">
             ${thermometer}max: ${date.temp.max}°C
            </div>
            <div class="weekly-card__info-inner">
             ${thermometer}min: ${date.temp.min}°C
            </div>
            </div>
        </span>
        </div>
`;
});

document.addEventListener("DOMContentLoaded", () => {
  //   let first = document.querySelector(".weekly-card");
  //   first.firstChild.textContent = "Today";
  //   if (first.nextSibling.nextSibling.firstChild !== null) {
  //     first.nextSibling.firstChild.textContent = "Tomorrow";
  //   } else {
  //     return null;
  //   }
  let targets = document.querySelectorAll(".weekly-card__date");
  targets[0].textContent = "Today";
  targets[1].textContent = "Tomorrow";
  for (let i = 2; i < targets.length; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let D = d.toString().slice(0, 10);
    targets[i].textContent = D.replace(" ", ", ");
  }
});
