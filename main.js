let firstDayShow = document.querySelector('.first-day');
let tommorowForcast = document.querySelector('.tommorow-forcast');
let afterTomorrow = document.querySelector('.after-tomorrow');
let searchInput = document.querySelector('.search');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


ip()

async function ip() {
    const response = await fetch(`http://ip-api.com/json/?fields=61439`);
    const data = await response.json();
    const cityNow = data.city
    weather(cityNow)
    searchInput.addEventListener('keyup',()=>{
        let b = searchInput.value;
        weather(b);
    })
}
async function weather(x) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6229850d76eb4fa7b16151038241406&q=${x}&days=3`);
    const data = await response.json();
    display(data)
}

function display(data) {
    firstDay(data)
    nextDay(data)
    afterNext(data)
}

function firstDay(data) {
    const locationData = data.location.name;
    const currentDeg = data.current.temp_c;
    const imgStatu = data.current.condition.icon;
    const statu = data.current.condition.text;
    const dateFirst = new Date(data.forecast.forecastday[0].date).getDay();
    const month = new Date(data.forecast.forecastday[0].date).getMonth();
    const monthDayArry = data.forecast.forecastday[0].date.split('-');
    const monthDay = monthDayArry[2];
    firstDayShow.innerHTML = `<div class="date d-flex justify-content-between p-2 px-3 mb-3">
                        <h2 class="h6" id="today">${days[dateFirst]}</h2>
                        <h2 class="h6" id="today-date">${monthDay} ${months[month]}</h2>
                    </div>
                    <div class="forcast-content py-4 px-4">
                        <h2 class="location h4">${locationData}</h2>
                        <div class="degree"><h2 class="h1 deg">${currentDeg}<sup>o</sup>C</h2>
                        <div class="icon-big"><img src ="${imgStatu}"alt="${statu}" id="firs-icon" class="w-100"></div></div>
                        <span class="firs-statu status d-block mb-3">${statu}</span>
                        <span class="me-3"><img src="images/icon-umberella.png" alt="" class="me-2">20%</span>
                        <span class="me-3"><img src="images/icon-wind.png" alt="" class="me-2">18km/h</span>
                        <span><img src="images/icon-compass.png" alt="" class="me-2">East</span>
                    </div>`
}
function nextDay(data) {
    const dateNext = new Date(data.forecast.forecastday[1].date).getDay();
    const nextDayMaxDeg = data.forecast.forecastday[1].day.maxtemp_c;
    const nextDayMinDeg = data.forecast.forecastday[1].day.mintemp_c;
    const nextDayStatu = data.forecast.forecastday[1].day.condition.text;
    const nextDayicon = data.forecast.forecastday[1].day.condition.icon;
    tommorowForcast.innerHTML = `<div class="date d-flex justify-content-center p-2 px-3">
    <h2 class="h6">${days[dateNext]}</h2>
    </div>
    <div
    class="forcast-content py-4 px-4 d-flex flex-column align-items-center justify-content-center h-75">
    <img src="${nextDayicon}" alt="${nextDayStatu}" class="mb-3">
    <h2 class="h4">${nextDayMaxDeg}<sup>o</sup>C</h2>
    <h2 class="h6 minDeg">${nextDayMinDeg}<sup>o</sup></h2>
    <span class="status d-block mt-3">${nextDayStatu}</span>
    </div>`
}
function afterNext(data) {
    const dateAfter = new Date(data.forecast.forecastday[2].date).getDay();
    const afterNextDayMaxDeg = data.forecast.forecastday[2].day.maxtemp_c;
    const afterNextDayMinDeg = data.forecast.forecastday[2].day.mintemp_c;
    const afterNextDayStatu = data.forecast.forecastday[2].day.condition.text;
    const afterNextDayicon = data.forecast.forecastday[2].day.condition.icon;
    afterTomorrow.innerHTML = `<div class="date d-flex justify-content-center p-2 px-3">
    <h2 class="h6">${days[dateAfter]}</h2>
    </div>
    <div
    class="forcast-content py-4 px-4 d-flex flex-column align-items-center justify-content-center h-75">
    <img src="${afterNextDayicon}" alt="${afterNextDayStatu}" class="mb-3">
    <h2 class="h4">${afterNextDayMaxDeg}<sup>o</sup>C</h2>
    <h2 class="h6 minDeg">${afterNextDayMinDeg}<sup>o</sup></h2>
    <span class="status d-block mt-3">${afterNextDayStatu}</span>
    </div>`
}



