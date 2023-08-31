const baseURL = 'http://api.weatherapi.com/v1/current.json?key=e9dcfb8adcb84893b0c182913232908&q=';
let url;

const searchedZip = document.querySelector('.zipCodeField');
const searchForm = document.querySelector('form');
const searchBtn = document.querySelector('.searchButton');

const section = document.querySelector('section');


searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    e.preventDefault();
    url = baseURL + searchedZip.value;
    console.log(url)

fetch(url) 
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    displayWeather(myJson)
})
};

function displayWeather(myJson) {
    let conditions = myJson.current;
    let locations = myJson.location
    console.log(conditions)
    let currentTempF = conditions.temp_f
    let city = locations.name
    let feelsLikeF = conditions.feelslike_f
    let conditionText = conditions.condition.text
    let conditionCode = conditions.condition.code

   
    let isDay;
    if (conditions.is_day === 1) {
        isDay = true } else {
            isDay = false
        };
    
    let todayTonight;
    if (isDay==true) {
        todayTonight = 'today'
    } else { todayTonight = 'tonight'};

    if (feelsLikeF >= 78) {
        document.querySelector('.header').textContent = `${city} looks great today - but it's gonna be a hot one! Current temp is ${currentTempF}ºF and it feels like ${feelsLikeF}º. You can expect ${conditionText} conditions ${todayTonight}.`
    } else if (feelsLikeF <= 77 && feelsLikeF >= 60) {
        document.querySelector('.header').textContent = `${city} ain't bad right now! It's currently ${currentTempF}ºF and it feels like ${feelsLikeF}º. You can expect ${conditionText} conditions ${todayTonight}.`
    } else if (feelsLikeF <=59 && feelsLikeF >= 50) {
        document.querySelector('.header').textContent = `${city} is kinda chilly right now! Current temp is ${currentTempF}ºF and it feels like ${feelsLikeF}º. You can expect ${conditionText} conditions ${todayTonight}.`
    } else if (feelsLikeF <= 49) {
        document.querySelector('.header').textContent = `${city} IS COLD!! Current temp is ${currentTempF}ºF and it feels like ${feelsLikeF}º. Grab a jacket! You can expect ${conditionText} conditions ${todayTonight}.`
    }

    switch (conditionCode) {
        case 1000: // Sunny Conditions
        case 1003:
            document.body.style.backgroundImage = "url('./assets/sunny.jpg')";
            break;
        case 1006: // Cloudy Conditions
        case 1009:
        case 1135:
        case 1147:
            document.body.style.backgroundImage = "url('./assets/cloudy.jpg)";
            break;
        case 1030: // Rainy Conditions
        case 1063:
        case 1150:
        case 1153: 
        case 1168: 
        case 1171: 
        case 1180:
        case 1183: 
        case 1186: 
        case 1189:
        case 1192:
        case 1195:
        case 1198: 
        case 1201:  
        case 1240:
        case 1243:
        case 1246: 
        case 1273:
        case 1276: 
            document.body.style.backgroundImage = "url('./assets/rainy.jpg')";
            break;
        case 1066: // Snowy / Icy Conditions
        case 1069:
        case 1072:
        case 1087:
        case 1114:
        case 1117:
        case 1204:
        case 1207:
        case 1210:
        case 1213:
        case 1216:
        case 1222:
        case 1225:
        case 1237:
        case 1249:
        case 1252:
        case 1255:
        case 1258:
        case 1261:
        case 1264:
        case 1279:
        case 1282:
            document.body.style.backgroundImage = "url('./assets/snowy.jpg')";
            break;
        default:
    };
    
    };

    