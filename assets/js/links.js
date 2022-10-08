let buttons = {
    firstButtonsContainer: { ...CONFIG.firstButtonsContainer },
    secondButtonsContainer: { ...CONFIG.secondButtonsContainer }
}

buttonEdite.forEach(button => {
    let id = button.id
    id = id.split('-')
    const listOfButtons = id[1] === "1" ?
        "firstButtonsContainer" : "secondButtonsContainer"
    console.log(CONFIG[listOfButtons][`${id[0]}`])
})