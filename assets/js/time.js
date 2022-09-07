// ┌┬┐┬┌┬┐┌─┐
//  │ ││││├┤
//  ┴ ┴┴ ┴└─┘
// Set time and Date

window.onload = displayClock()
function displayClock() {
	const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
		'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

	const d = new Date()
	const mm = monthNames[d.getMonth()]
	const dd = d.getDate()
	let min = (mins = ('0' + d.getMinutes()).slice(-2))
	let hh = d.getHours()
	let ampm = ''

	if (CONFIG.twelveHourFormat) {
		ampm = hh >= 12 ? ' pm' : ' am'
		hh = hh % 12
		hh = hh ? hh : 12
	}

	document.getElementById('hour').innerText = hh.toString().padStart(2, '0')
	document.getElementById('separator').innerHTML = ' : '
	document.getElementById('minutes').innerText = CONFIG.twelveHourFormat ? (min + ampm).toString().padStart(2, '0')
		: (min + ampm).toString().padStart(2, '0') + 'h'

	document.getElementById('month').innerText = mm
	document.getElementById('day').innerText = dd.toString().padStart(2, '0')

	setTimeout(displayClock, 1000)
}
