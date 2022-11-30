let city = document.querySelector("#city");

let country = document.querySelector("#country");
let countriesAndCities;
const baseUrl = `https://localhost:7133/api/`
let farmLocations = [];

consumeCountriesAndCities();
function consumeCountriesAndCities()
{
    fetch(`${baseUrl}GatewaysTest/GetCountryAndCitiesAsync`, {
        method : "GET",
    }).then((response) => response.json()).then((result) => {
        countriesAndCities = result;
    result.forEach(x => 
    {

        country.innerHTML += `
        <option value="${x.country}">${x.country}</option>
        `
    })
})
.catch((e) => 
{
 console.error(e);
})
}

 function setCities(e)
{
  
 countriesAndCities.forEach( x => {
    if(x.country === country.value)
    {
       farmLocations = x.cities;
       console.log(farmLocations);
        x.cities.forEach(y => {
        city.innerHTML += `
            <option class="options" value="${y}" selected=false>${y}</option>`});
        console.log(e);
    }})
  //let cities = document.querySelector(".options");
  //printCities(cities)
//   cities.addEventListener("mouseover",() =>{
//     console.log(city.options);
// })
}



let submitButton = document.querySelector("#sub-btn");
let listButton = document.querySelector("#list-btn");
let regFarm = document.querySelector("#subm-btn");
let farmerReg = document.querySelector("#farmer-reg");
let farmReg = document.querySelector("#farm-reg");
submitButton.addEventListener("click", (e) => {

 e.preventDefault();
          let nam = document.querySelector("#name");
        //   let country = document.querySelector("#country");
          
          let phoneNumbe = document.querySelector("#Number");
          let languag = document.querySelector("#language");
          Data = {
                    name : nam.value,
                    phoneNumber : phoneNumbe.value,
                    location : city.value,
                    language : languag.value,
          };
          console.log(Data.location,"70");
         fetch('https://localhost:7133/api/Farmer/RegisterFarmerAsync', {
                    method : "POST",
                    headers : {
                         'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(Data)
         }).then((response) => response.json()).then((result) => {
                  if(result.data === null) 
                  {
                    alert(`Farmer with phone number:${phoneNumbe.value} already exists`)
                  }
                    console.log(result)
                    return;
                    localStorage.setItem("farmerId", result.data.id);
                    localStorage.setItem("country",country.value);
                    alert(result.messages);
                    farmReg.style.display = "block";
                    farmerReg.style.display = "none";
         }).catch((e) => 
         {
                    alert(e.message);
                    console.error(e);
         })
})

let location2 = document.querySelector("#locatedCity");
let  farms = [];
location2.addEventListener("click",()=>{
    farmLocations.forEach(loca =>{
        location2.innerHTML += `
        <option class="options" value="${loca}" selected=false>${loca}</option>`});
    
})

listButton.addEventListener("click", (e) => {

 e.preventDefault();
          let name = document.querySelector("#farmname");
          let crop = document.querySelector("#crop");
          let tableBody = document.querySelector("#table-body");
        
          Data = {
                    farmName : name.value,
                    CropTypeId : crop.value,
                    locatedCity : location2.value,
                    farmerId: localStorage.getItem("farmerId")
          }
          console.log(locatedCity,117);
          farms.push(Data);
          console.log(farms);
          tableBody.innerHTML = "";
          farms.forEach((x) => {
                    tableBody.innerHTML += `<tr>
                    <td>${x.farmName}</td>
                    <td>${x.locatedCity}</td>
                </tr>`    
          })

})





regFarm.addEventListener("click", (e) => {
console.log("seen");
 e.preventDefault();
          
         fetch('https://localhost:7133/api/Farm/BulkFarmRegistration', {
                    method : "POST",
                    headers : {
                              'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(farms)
         }).then((response) => response.json()).then((result) => {
                    console.log(result)
                    alert(result.messages[2]);
         }).catch((e) => 
         {
                    console.log(e);
         })
})