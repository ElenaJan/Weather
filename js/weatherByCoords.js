import { getWeatherByCityName } from "./weatherByCityName.js";
import { changeBtn, cityLs, getErrorCoords } from "./weatherByCityName.js";

const coordsLs = 'coords';

export const body = document.querySelector('body');
export const weatherContainer = document.querySelector('.weather');
export const loc = document.querySelector('.weather__location-span');
export const temperature = document.querySelector('.weather__temperature-span');
export const temperatureFeelings = document.querySelector('.temperature-feelings__span');
export const weatherConditions = document.querySelector('.weather__weather-conditions-span');
export const wind = document.querySelector('.weather__wind-span');
export const humidity = document.querySelector('.weather__humidity-span');
export const pressure = document.querySelector('.weather__pressure-span');
export const visibility = document.querySelector('.weather__visibility-span');

export const locationContainer = document.querySelector('.location');
export const locationInput = document.querySelector('.location__input');
export const locationButton = document.querySelector('.location__button');

export function setBackground(icon) {
    switch (icon) {
        case '01d':
        case '01n':
            body.style =  `background-image: url(./img/clearsky.jpg);
                           color: #fff;`
            break;
        case '02d':
        case '02n':
            body.style =  `background-image: url(./img/fewclouds.jpg);`;
            break;
        case '03d':
        case '03n':
            body.style = `background-image: url(./img/scatteredclouds.jpg);
                          color: #fff;`
            break;
        case '04d':
        case '04n':
            body.style = `background-image: url(./img/brokenclouds.jpg)`;
            break; 
        case '09d':
        case '09n':
            body.style = `background-image: url(./img/showerrain.jpg);
                          color: #fff;`
            break; 
        case '10d':
        case '10n':
            body.style = `background-image: url(./img/drizzle.jpg);
                          color: #fff;`;
            break; 
        case '11d':
        case '11n':
            body.style = `background-image: url(./img/Thunder.jpg);
                          color: #fff;`
            break;
        case '13d':
        case '13n':
            body.style = `background-image: url(./img/snow.jpg);`
            break;
        case '50d':
        case '50n':
            body.style = `background-image: url(./img/mist.jpg);`
            break;
    }
}

function getWeatherByCoords(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=da8c7f5dcde283d5b4c56ac560d737dc&units=metric&lang=ru`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temp = json.main.temp;
        const tempFeel = json.main.feels_like;
        const place = json.name;
        const humid = json.main.humidity;
        const weatherDescription =  json.weather[0].description;
        const breeze = json.wind.speed;
        const pressureW = json.main.pressure;
        const visibilityW = json.visibility;
        const icon = json.weather[0].icon;

        loc.innerText = place;
        temperature.innerText = `${Math.round(temp)}°C`;
        temperatureFeelings.innerText = `${Math.round(tempFeel)}°C`;
        weatherConditions.innerText = weatherDescription;
        humidity.innerText = `${humid}%`;
        wind.innerText = `${breeze} м/с`;
        pressure.innerText = `${pressureW} мм.рт.ст.`;
        visibility.innerText = `${visibilityW / 1000} км`;

        setBackground(icon);

        changeBtn.style.display = 'block';
    })   
}

function saveCoords(positionObject) {
    localStorage.setItem(coordsLs, JSON.stringify(positionObject));
}

function getCoordsSuccessfully(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObject = {
        latitude,
        longitude
    };
    saveCoords(positionObject);
    getWeatherByCoords(latitude, longitude);
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(getCoordsSuccessfully, getErrorCoords);
}

function getCoords() {
    let coords = localStorage.getItem(coordsLs);
    let city = localStorage.getItem(cityLs);
    if(coords === null && city === null) {
        askCoords();
    } else if(city != null) {
        getWeatherByCityName(city);
    } else {
        let jsonCoords = JSON.parse(coords);
        getWeatherByCoords(jsonCoords.latitude, jsonCoords.longitude);
    }
}

function init() {
    getCoords();
}

init();
