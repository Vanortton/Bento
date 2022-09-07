let objectSaved = JSON.parse(window.localStorage.getItem('CONFIG'))
let CONFIGSaved = { ...objectSaved }

let base64String = objectSaved.dataImage || "assets/background.jpg"

function imageUploaded() {
    var file = document.querySelector('input#uploadImageBackground')['files'][0]
    var reader = new FileReader()
    reader.onload = function () {
        base64String = reader.result
        imageBase64Stringsep = base64String
    }
    reader.readAsDataURL(file)
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

    for (let input in inputs) {
        const toTrueOrFalse = value => value === 'true' ? true : value === 'false' ? false : value
        inputs[input] != null ? CONFIGSaved[`${inputs[input].name}`] = toTrueOrFalse(inputs[input].value) : ''
        window.localStorage.setItem('CONFIG', JSON.stringify(CONFIGSaved))
        objectSaved = JSON.parse(window.localStorage.getItem('CONFIG'))
        CONFIGSaved = { ...objectSaved }
    }

    CONFIGSaved.dataImage = base64String
    window.localStorage.setItem('CONFIG', JSON.stringify(CONFIGSaved))

    document.querySelector('.alert').style.transform = "scaleX(1) translate(-50%, -50%)"
    document.querySelector('.alert').style.opacity = "1"
    document.querySelector('.alert').innerHTML = "Alterações salvas"
    setTimeout(() => {
        document.querySelector('.alert').style.transform = "scaleX(0) translate(-50%, -50%)"
        document.querySelector('.alert').style.opacity = "0"
        window.location.reload()
    }, 1500)
}