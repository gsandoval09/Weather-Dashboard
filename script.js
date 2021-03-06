// tell computer what information to get in order to display on screen.
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const searchBarEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

//set days for real time to display proper accuarte day
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
//get real time data from month, day, year, hour
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const clock = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

         timeEl.innerHTML = (clock < 10? '0'+clock : clock) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

}, 1000);
//need to add latitude and longitude to get accurate weather in that location
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}
function searchBar () {
    var cityName= $("#current-weather-items").val()
    console.log (cityName)
    var searchUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    $.ajax({
        url:searchUrl,
        method:"GET"    
    })
.then(function(res){
var humidity=res.main.humidity
var pressure=res.main.pressure
$(".humidity").text(humidity)


    console.log(res)
}) 
}

$(".search").on("click",function(){
    searchBar()
})

//append to page like line 53
function showWeatherData (data){
    let {humidity, pressure, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
   
    
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}