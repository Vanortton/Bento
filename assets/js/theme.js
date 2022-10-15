//  ┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  │ ├─┤├┤ │││├┤
//  ┴ ┴ ┴└─┘┴ ┴└─┘
// Set theme based on Configurations and Preferences

let rgb = ''
const imagem = document.createElement("img")
imagem.src = CONFIGSaved.dataImage
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

function lightenColor(r, g, b) {
	const arrayRGB = [r, g, b]

	const porcentagem = (num, porcentagem, operation) => {
		const addOperation = num + (num * porcentagem)
		const subOperation = num - (num * porcentagem)
		const result = operation === '+' ? addOperation : subOperation
		result > 255 ? result = 255 : ''
		result < 0 ? result = 0 : ''
		return result
	}

	const regras = {
		lightTheme: themeEnable === 'Light',
		darkTheme: themeEnable === 'Dark',
		corForte: ''
	}
	if (themeEnable === 'Light') {
		for (let i = 0; i < arrayRGB.length; i++) {
			const result = Math.floor(porcentagem(arrayRGB[i], 0.3, '+'))
			arrayRGB[i] = result
		}
	} else if (themeEnable === 'Dark') {
		for (let i = 0; i < arrayRGB.length; i++) {
			const result = Math.floor(porcentagem(arrayRGB[i], 0.3, '-'))
			arrayRGB[i] = result
		}
	}

	const rgb = `rgb(${arrayRGB[0]}, ${arrayRGB[1]}, ${arrayRGB[2]})`
	document.body.style.setProperty('--accent', rgb)
}

function waitForImage(imgElem) {
	return new Promise((res, rej) => {
		if (imgElem.complete) {
			return res()
		}
		imgElem.onload = () => res()
		imgElem.onerror = () => rej(imgElem)
	})
}

async function averageColor(imgElem) {
	await waitForImage(imgElem)
	const canvas = new OffscreenCanvas(1, 1)

	const ctx = canvas.getContext("2d")
	ctx.drawImage(imgElem, 0, 0, 1, 1)
	const imgData = ctx.getImageData(0, 0, 1, 1)
	length = imgData.data.length
	let count = 0

	for (let i = 0; i < length; i += 4) {
		rgb.r += imgData.data[i]
		rgb.g += imgData.data[i + 1]
		rgb.b += imgData.data[i + 2]
		count++
	}

	return {
		r: Math.floor(imgData.data[0]/ count),
		g: Math.floor(imgData.data[1]/ count),
		b: Math.floor(imgData.data[2]/ count)
	};
}

function generateAccent() {
	averageColor(imagem).then(rgb => {
		lightenColor(rgb.r, rgb.g, rgb.b)
	})
}