
const dataIcon = document.querySelector('[data-icon]');
const dataTemp = document.querySelector('[data-temp]');
const dataMin = document.querySelector('[data-min]');
const dataMax = document.querySelector('[data-max]');
const dataFeels = document.querySelector('[data-feels]');


//local storage

// const tempInputs = document.querySelectorAll('[data-degrees]');
// const selectedTemp = localStorage.getItem('degrees');


// tempInputs.forEach((input) => {
//     if (selectedTemp === input.value) {
//         console.log(input.value)
//         input.checked = true;
//         getWeather(input.value);

//     }

//     input.addEventListener('change', () => {
//         localStorage.setItem('degrees', input.value);
//         console.log(input.value);
//         getWeather(input.value);
//     });
// });

// console.log(selectedTemp);


// //Cookies
const tempInputs = document.querySelectorAll('[data-degrees]');

function getCookiesAsObject() {
    const cookies = document.cookie.split('; ');

    const cookieObj = cookies.reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;

        return acc;
    }, {})

    return cookieObj;
}

const selectedTemp = getCookiesAsObject().degrees;
console.log(selectedTemp);

tempInputs.forEach((input) => {
    if (selectedTemp === input.value) {
        console.log(input.value)
        input.checked = true;
        getWeather(input.value);

    }

    input.addEventListener('change', () => {
        document.cookie = `degrees=${input.value}`
        console.log(input.value);
        getWeather(input.value);
    });
});


function getWeather(val) {
    console.log(val);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Brasov,Ro&appid=c7da641777760054e5ca6164eb47580a', {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonResp) {
        showTemperature(jsonResp, val);
    });
}

function showTemperature(jsonResp, val) {
    console.log(jsonResp);
    if (val === 'degrees-C') {
        getTempInC(jsonResp);
    } else if (val === 'degrees-F') {
        getTempInF(jsonResp);
    } else {
        return 'try again';
    };
}

function getTempInC(jsonResp) {

    dataIcon.src = `http://openweathermap.org/img/w/${jsonResp.weather[0].icon}.png`;

    let temp = jsonResp.main.temp - 273.15;
    dataTemp.innerHTML = 'The temperature is ' + temp.toPrecision(3) + '&#8451';

    let tempMin = jsonResp.main.temp_min - 273.15;
    dataMin.innerHTML = 'The Min temperature is ' + tempMin.toPrecision(3) + '&#8451';

    let tempMax = jsonResp.main.temp_max - 273.15;
    dataMax.innerHTML = 'The Max temperature is ' + tempMax.toPrecision(3) + '&#8451';

    let tempFeels = jsonResp.main.feels_like - 273.15;
    dataFeels.innerHTML =  'Feels like ' + tempFeels.toPrecision(3) + '&#8451';
}

function getTempInF(jsonResp) {

    dataIcon.src = `http://openweathermap.org/img/w/${jsonResp.weather[0].icon}.png`;

    let temp = jsonResp.main.temp * (9 / 5) - 459.67;
    dataTemp.innerHTML = 'The temperature is ' + temp.toPrecision(3) + '&#8457';

    let tempMin = jsonResp.main.temp_min * (9 / 5) - 459.67;
    dataMin.innerHTML = 'The Min temperature is ' + tempMin.toPrecision(3) + '&#8457';

    let tempMax = jsonResp.main.temp_max * (9 / 5) - 459.67;
    dataMax.innerHTML = 'The Max temperature is ' + tempMax.toPrecision(3) + '&#8457';

    let tempFeels = jsonResp.main.feels_like * (9 / 5) - 459.67;
    dataFeels.innerHTML = 'Feels like ' + tempFeels.toPrecision(3) + '&#8457';
}
