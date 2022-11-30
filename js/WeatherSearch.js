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
let cities = [];
let xCities;
let countriesAndCities;
const baseUrl = `https://localhost:7133/api/`
fetch(`${baseUrl}GatewaysTest/GetCountryAndCitiesAsync`, {
 method : "GET",
}).then((response) => response.json()).then((result) => {
    countriesAndCities = result;
    result.forEach(x => 
    {
       x.cities.forEach( x=> 
      {
        cities.push(x);
      })})
            console.log(cities);
      }).catch((e) => {
            console.log(e);
         })



         
// function fetchdrop()
// {
//   const choices = new Choices(".choices-select", {
//     silent: true,
//     choices: cities.map(city2 => ({
//       value: city2,
//       label: city2,
//     })),
//     removeItemButton: true,
//   });
//   console.log(choices.choices)
// }
//RUN THE DEFAULT FORECAST ONCE THE PAGE LOADS
window.onload = getWeather();

//EVENT LISTENER FOR CLICKING ON GET FORECAST BUTTON
getBtn.addEventListener("click", function () {
  getWeather();
});

//EVENT LISTENER FOR PRESSING ENTER
input.addEventListener("keyup", function (e) {
 
  if (e.key === "Enter") {
    if(!(cities.includes(input.value)) || input.value.includes("-"))
    {
      alert("Please Input A Valid African City ");
      return;
      // location.reload();
    }
   
    getWeather();
  }
});

function getWeather() {
  //EMPTY THE INNER HTML TO ALLOW FOR A NEW LOCATION FORECAST
  main.innerHTML = "";
  title.innerHTML = "";
  //SET THE LOCATION FROM THE USER INPUT
  input.value === "" ? (loc = "Abeokuta") : (loc = input.value);
  console.log(cities);
  
  fetch(url + loc)

    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //SET THE TITLE WITH THE NAME OF THE LOCATION
      console.log(data.data[0]);
      title.innerHTML += `<h1 style="color:white;font-weight:light; background:transparent;">24hr Weather forecast for ${data.data[0].city.name}</h1>`;
      const dataSetAccessed = data.data[0].dailyForecasts;
     for (let i = 0; i < data.data[0].dailyForecasts.length; i++) {

    
        console.log(`<img src="${icons + dataSetAccessed[i].weather[0].icon}@2x.png"/>`)
    //     //RENDER THE API DATA
     var newDate = (dataSetAccessed[i].dates.forecastDate).split("T")[0];
     console.log(newDate);
      main.innerHTML += `
       <div class="update" style="background: url(${night}); background-size: cover">

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


