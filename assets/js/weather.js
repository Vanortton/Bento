// ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
// │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
// └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
// Functions to setup Weather widget.

const cityElement = document.querySelector('.weatherCity h1')
const iconElement = document.querySelector('.weatherIcon')
const tempElement = document.querySelector('.weatherValue p')
const descElement = document.querySelector('.weatherDescription p')

const weather = {}
weather.temperature = {
	unit: 'celsius',
}

var tempUnit = CONFIG.weatherUnit

const KELVIN = 273.15
const key = `${CONFIG.weatherKey}`
setPosition()

function setPosition() {
	if (!CONFIG.trackLocation || !navigator.geolocation) {
		if (CONFIG.trackLocation) {
			console.error('Geolocation not available')
		}
		getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude)
		return
	}
	navigator.geolocation.getCurrentPosition(
		pos => {
			getWeather(pos.coords.latitude.toFixed(3), pos.coords.longitude.toFixed(3))
		},
		err => {
			console.error(err)
			getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude)
		}
	)
}

function getWeather(latitude, longitude) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${CONFIG.language}&appid=${key}`
	fetch(api)
		.then(function(response) {
			let data = response.json()
			return data
		})
		.then(function (data) {
			let celsius = Math.floor(data.main.temp - KELVIN)
			weather.name = data.name
			weather.temperature.value = tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32
			weather.description = data.weather[0].description
			weather.iconId = data.weather[0].icon
		})
		.then(function() {
			displayWeather()
		})
}

function displayWeather() {
	cityElement.innerHTML = weather.name + ': '
	iconElement.innerHTML = `<img src="assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.png" alt="Ícone do clima" />`
	tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`
	descElement.innerHTML = capitalize(weather.description)
}

const capitalize = str => {
	if (typeof str !== 'string') {
		return ''
	}
	return str.charAt(0).toUpperCase() + str.substr(1)
}