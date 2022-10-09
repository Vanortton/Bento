let buttons = {
    firstButtonsContainer: { ...CONFIG.firstButtonsContainer },
    secondButtonsContainer: { ...CONFIG.secondButtonsContainer }
}

const buttonsEdite = document.querySelectorAll('.button-edite')
const form = document.querySelector('.formEditeButton')
const inputIcon = document.querySelector('.formEditeButton input[data-icon]')
const inputName = document.querySelector('.formEditeButton input[data-name]')
const inputUrl = document.querySelector('.formEditeButton input[data-url]')

buttonsEdite.forEach(button => {
    button.onclick = () => {
        const indexButton = (button.id).split('-')[0]
        const section = (button.id).split('-')[1]
        const sectionName = section === '1' ? 'firstButtonsContainer'
            : 'secondButtonsContainer'
        
        console.log(form.style.transform = 'translate(-50%, -50%) scale(1)')
    }
})

google.load('language', 'l')
function translate(txt) {
    let finalText = null
    google.language.detect(txt, function (result) {
        if (!result.error && result.language) {
            google.language.translate(txt, '', 'en', function (result) {
                if (result.translation) {
                    finalText = result.translation
                } else {
                    alert('Um erro ocorreu durante a escolha do ícone.')
                }
            })
        }
    })
}

inputIcon.onkeyup = (e) => {
    translate(e.target.value)
}