let city = document.querySelector("#city");
let country = document.querySelector("#country");
fetch('https://localhost:7133/api/GatewaysTest/GetCountryAndCitiesAsync', {
                    method : "GET",
         }).then((response) => response.json()).then((result) => {
                    console.log(result)
                    result.forEach(x => {
                        country.innerHTML += `
                        <option value="${x.country}">${x.country}</option>
                        `
                    })
         }).catch((e) => 
         {
                    console.log(e);
         })

city.addEventListener("click", (e) =>{
    fetch('https://localhost:7133/api/GatewaysTest/GetCountryAndCitiesAsync', {
        method : "GET",
        }).then((response) => response.json()).then((result) => {
                console.log(result)
                result.forEach(x => {
                    if(x.country == country.value)
                    {
                        console.log("25", x.cities);
                        x.cities.forEach(y => {
                            city.innerHTML += `
                            <option value="${y}">${y}</option>
                            `
                        })
                        
                    }
                    
                })
        }).catch((e) => 
        {
                console.log(e);
        })
})

let submitButton = document.querySelector("#sub-btn");
let listButton = document.querySelector("#list-btn");
let regFarm = document.querySelector("#subm-btn");
let farmerReg = document.querySelector("#farmer-reg");
let farmReg = document.querySelector("#farm-reg");
submitButton.addEventListener("click", (e) => {

 e.preventDefault();
          let nam = document.querySelector("#name");
          let country = document.querySelector("#country");
          let phoneNumbe = document.querySelector("#Number");
          let languag = document.querySelector("#language");
          Data = {
                    name : nam.value,
                    phoneNumber : phoneNumbe.value,
                    location : city.value,
                    language : languag.value,
          };
          
         fetch('https://localhost:7133/api/Farmer/RegisterFarmerAsync', {
                    method : "POST",
                    headers : {
                              'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(Data)
         }).then((response) => response.json()).then((result) => {
                    console.log(result)
                    localStorage.setItem("farmerId", result.data.id);
                    alert(result.messages);
                    farmReg.style.display = "block";
                    farmerReg.style.display = "none";
         }).catch((e) => 
         {
                    alert(e.message);
                    console.log(e);
         })
})


let  farms = [];

listButton.addEventListener("click", (e) => {

 e.preventDefault();
          let name = document.querySelector("#farmname");
          let location = document.querySelector("#locatedCity");
          let crop = document.querySelector("#crop");
          let tableBody = document.querySelector("#table-body");
          Data = {
                    farmName : name.value,
                    CropTypeId : crop.value,
                    locatedCity : location.value,
                    farmerId: localStorage.getItem("farmerId")
          }
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
         }).catch((e) => 
         {
                    console.log(e);
         })
})