const SVGs = {
    info: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" style=" fill:#000000;" width="30px"><path fill="#2196f3" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"></path></svg>`,
    warn: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 171 171" width="30px"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,171.99219v-171.99219h171.99219v171.99219z" fill="none"></path><g><path d="M156.75,85.5c0,39.1875 -32.0625,71.25 -71.25,71.25c-39.1875,0 -71.25,-32.0625 -71.25,-71.25c0,-39.1875 32.0625,-71.25 71.25,-71.25c39.1875,0 71.25,32.0625 71.25,71.25z" fill="#ffca28"></path><path d="M93.3375,97.25625h-15.675v-55.21875h15.675zM77.6625,121.125c0,-4.275 3.5625,-7.8375 7.8375,-7.8375c4.275,0 7.8375,3.5625 7.8375,7.8375c0,4.275 -3.5625,7.8375 -7.8375,7.8375c-4.275,0 -7.8375,-3.5625 -7.8375,-7.8375z" fill="#37474f"></path></g></g></svg>`,
    danger: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172" width="30px"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M157.66667,86c0,39.41667 -32.25,71.66667 -71.66667,71.66667c-39.41667,0 -71.66667,-32.25 -71.66667,-71.66667c0,-39.41667 32.25,-71.66667 71.66667,-71.66667c39.41667,0 71.66667,32.25 71.66667,71.66667z" fill="#e74c3c"></path><path d="M93.88333,97.825h-15.76667v-55.54167h15.76667zM78.11667,121.83333c0,-4.3 3.58333,-7.88333 7.88333,-7.88333c4.3,0 7.88333,3.58333 7.88333,7.88333c0,4.3 -3.58333,7.88333 -7.88333,7.88333c-4.3,0 -7.88333,-3.58333 -7.88333,-7.88333z" fill="#ffffff"></path></g></g></svg>`
}

const background = {
    info: '#16546a',
    warn: '#aa860b',
    danger: '#700c1f'
}

function alertCustom({ title, messageHTML, type, timeToHide = 3000 }) {
    const divAllAlerts = document.querySelector('.alerts')

    const divAlert = document.createElement('div')
    divAlert.classList.add('alert')
    divAlert.style.background = background[`${type}`]

    const alertTitle = document.createElement('div')
    alertTitle.classList.add('alertTitle')

    const alertTitleH3 = document.createElement('h3')
    alertTitleH3.innerText = title

    const descriptionAlert = document.createElement('p')
    descriptionAlert.classList.add('description')
    descriptionAlert.innerHTML = messageHTML

    alertTitle.innerHTML = SVGs[`${type}`]
    alertTitle.appendChild(alertTitleH3)
    divAlert.appendChild(alertTitle)
    divAlert.appendChild(descriptionAlert)
    divAllAlerts.appendChild(divAlert)

    setTimeout(() => {
        divAlert.style.transform = 'translateX(0%)'
    }, 100)
    setTimeout(() => {
        divAlert.style.transform = 'translateX(110%)'
        setTimeout(() => {
            divAlert.parentNode.removeChild(divAlert)
        }, 500)
    }, timeToHide)
}