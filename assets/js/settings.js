function imageUploaded() {
    var file = document.querySelector('input#uploadImageBackground')['files'][0]
    var reader = new FileReader()
    reader.onload = function () {
        base64String = reader.result
        imageBase64Stringsep = base64String
    }
    reader.readAsDataURL(file)
}

function alertPerson(text) {
    document.querySelector('.alert').style.transform = "scaleX(1) translate(-50%, -50%)"
    document.querySelector('.alert').style.opacity = "1"
    document.querySelector('.alert').innerHTML = text
    setTimeout(() => {
        document.querySelector('.alert').style.transform = "scaleX(0) translate(-50%, -50%)"
        document.querySelector('.alert').style.opacity = "0"
        window.location.reload()
    }, 1500)
}

function saveData() {
    const inputs = {
        name: document.querySelector('input[name="name"]'),
        imageBackground: document.querySelector('input[name="imageBackground"]:checked'),
        openInNewTab: document.querySelector('input[name="openInNewTab"]:checked'),
        twelveHourFormat: document.querySelector('input[name="twelveHourFormat"]:checked'),
        bentoLayout: document.querySelector('input[name="bentoLayout"]:checked'),
        weatherIcons: document.querySelector('input[name="weatherIcons"]:checked'),
        changeThemeByHour: document.querySelector('input[name="changeThemeByHour"]:checked'),
        hourDarkThemeActive: document.querySelector('input[name="hourDarkThemeActive"]'),
        hourDarkThemeInactive: document.querySelector('input[name="hourDarkThemeInactive"]'),
        changeThemeByOS: document.querySelector('input[name="changeThemeByOS"]:checked'),
        autoChangeTheme: document.querySelector('input[name="autoChangeTheme"]:checked'),
    }

    const toTrueOrFalse = value => value === 'true' ? true : value === 'false' ? false : value

    for (let input in inputs) {
        inputs[input] != null ? CONFIGSaved[`${inputs[input].name}`] = toTrueOrFalse(inputs[input].value) : ''
        window.localStorage.setItem('CONFIG', JSON.stringify(CONFIGSaved))
        objectSaved = JSON.parse(window.localStorage.getItem('CONFIG'))
        CONFIGSaved = { ...objectSaved }
    }

    CONFIGSaved.dataImage = base64String
    window.localStorage.setItem('CONFIG', JSON.stringify(CONFIGSaved))


    const devOption = document.querySelector('input[name="devOption"]:checked') ?
        document.querySelector('input[name="devOption"]:checked') :
        document.querySelector('input[name="devOption" id="devOptionFalse"]')
    
    window.localStorage.setItem('devOption', JSON.stringify(toTrueOrFalse(devOption.value)))

    alertPerson('Alterações salvas')
}

document.querySelector('button[btn-salvar]').onclick = (e) => {
    e.preventDefault()
    saveData()
}

window.localStorage.getItem('devOption') === null ?
    window.localStorage.setItem('devOption', JSON.stringify(false)) : ''

let devOption = window.localStorage.getItem('devOption') === 'true' ? true : false
document.querySelector(`input[name="devOption"][value="${devOption}"]`).checked = true

document.querySelector('input[name="name"]').value = CONFIGSaved.name ? CONFIGSaved.name : 'User'

for (const sett in CONFIGSaved) {
    sett !== 'name' && sett !== 'hourDarkThemeActive' && sett !== 'hourDarkThemeInactive' && sett !== 'dataImage' ?
        document.querySelector(`input[name="${sett}"][value="${CONFIGSaved[sett]}"]`).checked = true : ''
    sett === 'hourDarkThemeActive' || sett === 'hourDarkThemeInactive' ? document.querySelector(`input[name="${sett}"]`).value = CONFIGSaved[sett] : ''
}

const formatData = document.querySelector('button[format-data]')
const formatButtons = document.querySelector('button[format-buttons]')
formatData.onclick = () => {
    window.localStorage.removeItem('CONFIG')
    alertPerson('Dados apagados')
}
formatButtons.onclick = () => {
    window.localStorage.removeItem('buttons')
    alertPerson('Botões restaurados')
}