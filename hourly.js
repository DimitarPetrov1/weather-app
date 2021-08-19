import { preferedUnitsTemp, preferredUnitsSpeed } from "./src/data.js";
let hourlyTarget = document.querySelector(".hourly-wrap");
let data = JSON.parse(localStorage.getItem("data"));

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
  p3.textContent = temp + preferedUnitsTemp;
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
  let Data = data.hourly;
  let URL_image = `http://openweathermap.org/img/wn/${Data[i].weather[0].icon}@2x.png`;
  hourlyTarget.appendChild(createTemplate(h + ":00", URL_image, Data[i].temp));
}
