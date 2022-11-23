//DECLARE VARIABLES
let main = document.getElementById("main");
let title = document.getElementById("location");
const getBtn = document.getElementById("getWeather");
let input = document.getElementById("userInput");
let temperature = document.querySelector("temp");
let icons = "http://openweathermap.org/img/wn/";
let loc = "";
var url = `https://localhost:7133/api/Utility/SearchWeatherForcastByLocation?farmLocation=`;
let date = "";
let time = "";
let background = "";
let night = "/assets/night.png";
let sunrise = "/assets/Sunrise.png";
let day = "/assets/Day.png";

//RUN THE DEFAULT FORECAST ONCE THE PAGE LOADS
window.onload = getWeather();

//EVENT LISTENER FOR CLICKING ON GET FORECAST BUTTON
getBtn.addEventListener("click", function () {
  getWeather();
});

//EVENT LISTENER FOR PRESSING ENTER
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  //EMPTY THE INNER HTML TO ALLOW FOR A NEW LOCATION FORECAST
  main.innerHTML = "";
  title.innerHTML = "";
  //SET THE LOCATION FROM THE USER INPUT
  input.value === "" ? (loc = "Abeokuta") : (loc = input.value);
  console.log(url);
  fetch(url + loc)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //SET THE TITLE WITH THE NAME OF THE LOCATION
      console.log(data.data[0]);
      title.innerHTML += `<h1>24hr Weather forecast for ${data.data[0].city.name}</h1>`;
      const dataSetAccessed = data.data[0].dailyForecasts;
     for (let i = 0; i < data.data[0].dailyForecasts.length; i++) {

     // SET THE BACKGROUND DEPENDING ON THE TIME OF DAY
          date = data.data[0].dailyForecasts;
          console.log(date);
          text = String(dataSetAccessed[i].dt);
          console.log(text);
         time = String(dataSetAccessed[i].dt);
         console.log(time.length);
       if (Number(time) > 19) {
         background = night;
        }
        else if (Number(time) > 5 && Number(time) < 9) 
         {
          background = sunrise;
        } 
       else if (Number(time) > 9 && Number(time) < 19) {
          background = day;
        }
        console.log(`<img src="${icons + dataSetAccessed[i].weather[0].icon}@2x.png"/>`)
    //     //RENDER THE API DATA
     var newDate = (dataSetAccessed[i].dates.forecastDate).split("T")[0];
     console.log(newDate);
      main.innerHTML += `
       <div class="update" style="background: url(${background}); background-size: cover">

        <h2>${dataSetAccessed[i].weather[0].main}</h2>
       <div class="icon" style="border: 5px solid #10A1E5">
       <img src="${icons + dataSetAccessed[i].weather[0].icon}@2x.png"/>
       </div>
       <p>${dataSetAccessed[i].weather[0].description}</p>
       <p>${Math.round(dataSetAccessed[i].temp.day)}°C</p>
        <ul>
        <li>Forecast For:</li>
         <li>${new Date(newDate)} </li>
        </ul>
      </div>
     `;
      console.log(main);
      }
    });
}

//url + 'London&appid=4bd375ae392fd932766eeb5bd0b6633e'
