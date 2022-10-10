//  ┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  │ ├─┤├┤ │││├┤
//  ┴ ┴ ┴└─┘┴ ┴└─┘
// Set theme based on Configurations and Preferences

let rgb = ''
let darkTheme = localStorage.getItem('darkTheme')
let themeEnable = 'Light'
const themeToggle = document.querySelector('#themeButton')
const bodyBackground = document.getElementById('#body')

const enableDark = () => {
	document.body.classList.add('darktheme')
	localStorage.setItem('darkTheme', 'enabled')
	themeToggle.innerHTML = `<i id="themeButton__icon" icon-name="sun"></i>`
	lucide.createIcons()
	themeEnable = 'Dark'
	generateAccent()
	document.querySelector('html').style.colorScheme = "dark"
}

const disableDark = () => {
	document.body.classList.remove('darktheme')
	localStorage.setItem('darkTheme', 'disable')
	themeToggle.innerHTML = `<i id="themeButton__icon" icon-name="moon"></i>`
	lucide.createIcons()
	themeEnable = 'Light'
	generateAccent()
	document.querySelector('html').style.colorScheme = "light"
}

if (darkTheme === 'enabled') {
	console.log('Dark theme is enabled')
	document.body.classList.add('notransition')
	enableDark()
	document.body.classList.remove('notransition')
} else {
	disableDark()
}

themeToggle.addEventListener('click', () => {
	darkTheme = localStorage.getItem('darkTheme')
	if (darkTheme !== 'enabled') {
		enableDark()
	} else {
		disableDark()
	}
})

if (CONFIG.imageBackground) {
	document.body.classList.add('withImageBackground')
	document.body.style.setProperty('--imgbg', `url(${CONFIGSaved.dataImage})`)
}

if (CONFIG.changeThemeByOS && CONFIG.autoChangeTheme) {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		enableDark()
	} else {
		disableDark()
	}
}

if (CONFIG.changeThemeByHour && CONFIG.autoChangeTheme && !CONFIG.changeThemeByOS) {
	const date = new Date()
	const hours = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
	const currentTime = hours + ':' + minutes
	if (currentTime >= CONFIG.hourDarkThemeActive) {
		enableDark()
	} else if (currentTime >= CONFIG.hourDarkThemeInactive) {
		disableDark()
	}
}

function averageColor(imageElement) {
	var canvas = document.createElement('canvas'),

		context = canvas.getContext && canvas.getContext('2d'), imgData, width, height, length,
		rgb = { r: 0, g: 0, b: 0 },
		count = 0
	height = canvas.height =
		imageElement.naturalHeight ||
		imageElement.offsetHeight ||
		imageElement.height
	width = canvas.width =
		imageElement.naturalWidth ||
		imageElement.offsetWidth ||
		imageElement.width
	context.drawImage(imageElement, 0, 0)
	imgData = context.getImageData(
		1, 1, width, height)
	length = imgData.data.length

	for (let i = 0; i < length; i += 4) {
		rgb.r += imgData.data[i]
		rgb.g += imgData.data[i + 1]
		rgb.b += imgData.data[i + 2]
		count++
	}

	// Creating an average color
	rgb.r = Math.floor(rgb.r / count)
	rgb.g = Math.floor(rgb.g / count)
	rgb.b = Math.floor(rgb.b / count)

	return rgb
}

function lightenColor(r, g, b) {
	// Creating rules for how much to lighten the color
	const rules = {
		allWhite: r === 255 && g === 255 && b === 255,
		allBlack: r === 0 && g === 0 && b === 0,
		veryClear: r >= 115 && g >= 115 && b >= 115,
		veryDark: r < 15 && g < 15 && b < 15
	}

	// Checking color clarity
	let vezes = themeEnable === 'Dark' ? 1.5 : 3
	if (rules.veryDark) vezes = themeEnable === 'Dark' ? 4.5 : 11
	if (rules.veryClear) vezes = themeEnable === 'Dark' ? -8 : 1
	if (rules.allWhite) vezes = 0
	if (rules.allBlack) vezes = 0

	// lightened the colors
	r = vezes > 0 ? r * vezes : r - (vezes * vezes)
	g = vezes > 0 ? g * vezes : g - (vezes * vezes)
	b = vezes > 0 ? b * vezes : b - (vezes * vezes)
	const rgb = `rgb(${r}, ${g}, ${b})`
	return rgb
}

function generateAccent() {
	const img = document.createElement('img')
	img.src = CONFIGSaved.dataImage
	rgb = averageColor(img)

	const stringRGB = lightenColor(rgb.r, rgb.g, rgb.b)
	document.body.style.setProperty('--accent', stringRGB)
}

setTimeout(() => generateAccent(), 500)