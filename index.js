import { KEY } from "./src/data.js";
let enteredLocation = "Plovdiv";
// current stats in the location

const topDate = document.getElementById("topDate");

const fetchLocation = async () => {
  await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${enteredLocation}&aqi=no`
  )
    .then((response) => response.json())
    .then(
      // (data) => (
      //   (currentInLocation.name = data.location.name),
      //   (currentInLocation.country = data.location.country),
      //   (currentInLocation.localTime = data.location.localtime),
      //   (currentInLocation.currentTemp = data.current.temp_c),
      //   (currentInLocation.lastUpdated = data.current.last_updated),
      //   (currentInLocation.currentText = data.current.condition.text),
      //   (currentInLocation.currentIconForText = data.current.condition.icon)
      // )
      (data) => {
        topDate.textContent = data.location.localtime;
      }
    )
    .catch((err) => console.log(err));
};

fetchLocation();
