import { preferedUnitsTemp, preferredUnitsSpeed } from "./src/data.js";

let data = JSON.parse(localStorage.getItem("data"));
console.log(data);

function createTemplate(time, img, temp) {
  let template = document.createElement("div");
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
  p3.textContent = temp + preferedUnitsTemp;
  template.appendChild(p3);

  return template;
}

let hourlyTarget = document.querySelector(".hourly-wrap");
let changeOfRain = document.getElementById("changeOfRain");

data.hourly.map((i) => {
  hourlyTarget.appendChild(createTemplate(i.dt, i.weather.icon, i.temp));
});

function getCurrentHour() {
  let today = new Date();
  let curretHour = today.getHours();
  return Number(curretHour);
}

// let i = 0;
// while (i < 24) {
//   hourlyTime.push(data.forecast.forecastday[0].hour[i].time.slice(10, 16));
//   hourlyImg.push(data.forecast.forecastday[0].hour[i].condition.icon);
//   hourlyTemp.push(data.forecast.forecastday[0].hour[i].temp_c + "°C");
//   if (i >= getCurrentHour()) {
//     hourlyTarget.appendChild(
//       createTemplate(hourlyTime[i], hourlyImg[i], hourlyTemp[i])
//     );
//     // maybe needs looking into
//     changeOfRain.textContent =
//       data.forecast.forecastday[0].hour[i].chance_of_rain + "%";
//   }
//   i++;
// }
