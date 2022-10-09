let buttons = {
    firstButtonsContainer: { ...CONFIG.firstButtonsContainer },
    secondButtonsContainer: { ...CONFIG.secondButtonsContainer }
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
        form.style.transform = 'translate(-50%, -50%) scale(1)'
    } else if (action === 'close') {
        form.style.transform = 'translate(-50%, -50%) scale(0)'
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
        
        openCloseForm('open')
    }
})

buttonCancel.onclick = () => {
    openCloseForm('close')
}