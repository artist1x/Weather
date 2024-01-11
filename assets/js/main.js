
let search = document.getElementById("Search");
let dayOn = document.getElementById("dayName");
let cityDayOn = document.querySelectorAll(".location"); 
let degreeDayOn = document.getElementById("degree");
let imgDayOn = document.getElementById("img-dayOn");
let textDayOn = document.getElementById("text-weather");
let windDayOn = document.getElementById("wind-Dayon");
let speedWindDayOn = document.getElementById("wind-speed");
let windDirDayOn = document.getElementById("wind-dir"); 

let timeOn = document.getElementById("timeOn")
let locationInfo = document.getElementById("location-info")

let table = document.getElementById("table-weather")

async function getWeather (City){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=304fc169e3a247708df204005240901&q=${City}&days=7`)
    let response = await data.json() ;
    return response ; 
    
}

function displayData(data){
    let todayName = new Date()
    dayOn.innerHTML = todayName.toLocaleDateString("en-US" , {weekday:"long"})
    cityDayOn.forEach((element) => {element.textContent = data.location.name;});
    degreeDayOn.innerHTML = data.current.temp_c ; 
    imgDayOn.setAttribute("src" , data.current.condition.icon);
    textDayOn.innerHTML = data.current.condition.text ;
    windDayOn.innerHTML = data.current.humidity+"%";
    speedWindDayOn.innerHTML = data.current.wind_kph+"km/h";
    windDirDayOn.innerHTML = data.current.wind_dir ;
    timeOn.innerHTML = data.location.localtime;
    locationInfo.innerHTML = data.location.tz_id;
}



function getTableData(data){
    let cartona = ``; 
    let allDays ;
    for(let i= 0 ; i < data.forecast.forecastday.length ; i++){
        allDays = new Date(data.forecast.forecastday[i].date)
        cartona += `
        <tr>
        <td>${allDays.toLocaleDateString("en-US" , {weekday:"long"})}</td>
        <td>${data.forecast.forecastday[i].day.maxtemp_c}°C</td>
        <td>${data.forecast.forecastday[i].day.mintemp_c}°C</td>
        <td>${data.forecast.forecastday[i].day.condition.text}</td>
        <td><i><img src="${data.forecast.forecastday[i].day.condition.icon}" alt=""></i></td>
        <td>${data.forecast.forecastday[i].astro.sunrise}</td>
        <td>${data.forecast.forecastday[i].astro.sunset}</td>
        </tr>
        `
    }
    table.innerHTML = cartona ;
}



async function gitAll(myCity="cairo"){
    let responseDisplay = await getWeather(myCity); 
    if(!responseDisplay.error){
        displayData(responseDisplay)
        getTableData(responseDisplay)
    }
}

gitAll()
search.addEventListener("input" , function(){
    gitAll(search.value)
})

