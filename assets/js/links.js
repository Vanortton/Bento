const buttonToEdite = {
    indexButton: '1',
    sectionName: 'firstButtonsContainer'
}
const buttonsEdite = document.querySelectorAll('.button-edite')
const form = document.querySelector('.formEditeButton')
const inputIcon = document.querySelector('.formEditeButton input[data-icon]')
const inputName = document.querySelector('.formEditeButton input[data-name]')
const inputUrl = document.querySelector('.formEditeButton input[data-url]')
const buttonSave = document.querySelector('.formEditeButton button[data-save]')
const buttonCancel = document.querySelector('.formEditeButton button[data-cancel]')

function openCloseForm(action) {
    if (action === 'open') {
        document.body.style.overflow = 'hidden'
        window.scrollTo({
            top: 150,
            behavior: 'smooth'
        }) 
        form.style.scale = '1'
    } else if (action === 'close') {
        document.body.style.overflow = 'auto'
        form.style.scale = '0'
    } else {
        throw new Error('Invalid action')
    }
}

buttonsEdite.forEach(button => {
    button.onclick = () => {
        const indexButton = (button.id).split('-')[0]
        const section = (button.id).split('-')[1]
        const sectionName = section === '1' ? 'firstButtonsContainer'
            : 'secondButtonsContainer'
        buttonToEdite.indexButton = indexButton
        buttonToEdite.sectionName = sectionName
        openCloseForm('open')
    }
})

buttonSave.onclick = () => {
    if (inputName.value && inputUrl.value) {
        const section = `${buttonToEdite.sectionName}`
        const index = `${buttonToEdite.indexButton - 1}`
        const buttonInEdition = buttons[section][index]
        buttonInEdition.name = inputName.value
        buttonInEdition.link = inputUrl.value
        buttonInEdition.icon = inputIcon.value
        window.localStorage.setItem('buttons', JSON.stringify(buttons))
        openCloseForm('close')
        window.location.reload()
    } else {
        alert('Preencha todos os campos')
    }
}

buttonCancel.onclick = () => {
    inputName.value = ""
    inputUrl.value = "https://"
    openCloseForm('close')
}