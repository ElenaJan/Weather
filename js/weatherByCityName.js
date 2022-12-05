import{body, weatherContainer, locationContainer, locationInput, locationButton, loc, temperature, temperatureFeelings, weatherConditions, humidity, wind, pressure, visibility, setBackground} from './weatherByCoords.js'

export const changeBtn = document.querySelector('.btn-change');

export const cityLs = 'city';

export function getWeatherByCityName(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=da8c7f5dcde283d5b4c56ac560d737dc&lang=ru&units=metric`)
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
    .catch((error) => {
        Swal.fire({
            title: 'Такой город не найден!',
            text: 'Пожалуйста, введите название своего города еще раз!',
            icon: 'error',
            confirmButtonText: 'Ок'
        })
        cleanStorage();
        getErrorCoords();
    })
}

function saveCityName(city) {
    localStorage.setItem(cityLs, city);
}

function clearInput() {
    locationInput.value = '';
}

function submitHandler(event) {
    event.preventDefault();
    const city = locationInput.value;
    if(!city) {
        Swal.fire({
            title: 'Поле город не может быть пустым!',
            text: 'Введите, пожалуйста, название своего города!',
            icon: 'error',
            confirmButtonText: 'Ок',
            customClass: {
                container: 'position-absolute'
            },
        })
    } else {
        getWeatherByCityName(city);
        saveCityName(city);
        locationContainer.style.display = 'none';
        weatherContainer.style.display = 'block';
        clearInput();
    }
}


export function getErrorCoords() {
    weatherContainer.style.display = 'none';
    locationContainer.style.display = 'flex';
    locationButton.addEventListener('click', submitHandler);
}

function cleanStorage() {
    localStorage.clear();
}

function changeCity() {
    body.style = `background-image: url(/img/background.svg);
                  color: #fff;`
    cleanStorage();
    getErrorCoords();
    changeBtn.style.display = 'none';
}

changeBtn.addEventListener('click', changeCity);