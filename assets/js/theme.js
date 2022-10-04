//  ┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  │ ├─┤├┤ │││├┤
//  ┴ ┴ ┴└─┘┴ ┴└─┘
// Set theme based on Configurations and Preferences

let darkTheme = localStorage.getItem('darkTheme')
const themeToggle = document.querySelector('#themeButton')
const bodyBackground = document.getElementById('#body')

const enableDark = () => {
	document.body.classList.add('darktheme')
	localStorage.setItem('darkTheme', 'enabled')
	themeToggle.innerHTML = `<i id="themeButton__icon" icon-name="sun"></i>`
	lucide.createIcons()
	document.querySelector('html').style.colorScheme = "dark"
}

const disableDark = () => {
	document.body.classList.remove('darktheme')
	localStorage.setItem('darkTheme', 'disable')
	themeToggle.innerHTML = `<i id="themeButton__icon" icon-name="moon"></i>`
	lucide.createIcons()
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
		0, 0, width, height)
	length = imgData.data.length

	for (let i = 0; i < length; i += 4) {
		rgb.r += imgData.data[i]
		rgb.g += imgData.data[i + 1]
		rgb.b += imgData.data[i + 2]
		count++
	}

	rgb.r = Math.floor(rgb.r / count)
	rgb.g = Math.floor(rgb.g / count)
	rgb.b = Math.floor(rgb.b / count)

	return rgb
}
let mediaColorsImg;

setTimeout(() => {
	const img = document.createElement('img')
	img.src = CONFIGSaved.dataImage
	mediaColorsImg = averageColor(img)

	const stringRGB = 'rgb(' + (rgb.r > 0 ? rgb.r + 50 : rgb.r) + ','
		+ (rgb.g + 30) + ','
		+ (rgb.r <= 0 ? rgb.b + 150 : rgb.b) + ')'
	document.body.style.setProperty('--accent', stringRGB)
}, 500)
