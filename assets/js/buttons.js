// ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
// ├┴┐│ │ │  │ │ ││││└─┐
// └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘
// Function to print Button Cards.
JSON.parse(window.localStorage.getItem('buttons')) == null ?
	window.localStorage.setItem('buttons', JSON.stringify(buttons)) : buttons = JSON.parse(window.localStorage.getItem('buttons'))

const generateFirstButtonsContainer = () => {
	for (const button of buttons.firstButtonsContainer) {
		let item = `
        <div class="link_glob">
			<a
          	href="${button.link}"
          	target="${CONFIG.openInNewTab ? '_blank' : ''}"
          	class="card button button__${button.id}" id="${button.id}-1" title="${button.name}" >
          		<i class="buttonIcon" icon-name="${button.icon}"></i>
		  		<span>&nbsp;${button.name}</span>
        	</a>
			<button aria-label="Editar link" class="button-edite" id="${button.id}-1">
				<i icon-name="pencil"></i>
			</button>
		</div>
    `;

		const position = 'beforeend';

		buttons_1.insertAdjacentHTML(position, item);
	}
};

const generateSecondButtonsContainer = () => {
	for (const button of buttons.secondButtonsContainer) {
		let item = `
        <div class="link_glob">
			<a
          	href="${button.link}"
          	target="${CONFIG.openInNewTab ? '_blank' : ''}"
          	class="card button button__${button.id}" id="${button.id}-2" title="${button.name}" >
          		<i class="buttonIcon" icon-name="${button.icon}"></i>
		  		<span>&nbsp;${button.name}</span>
        	</a>
			<button aria-label="Editar link" class="button-edite" id="${button.id}-2">
				<i icon-name="pencil"></i>
			</button>
		</div>
    `;

		const position = 'beforeend';

		buttons_2.insertAdjacentHTML(position, item);
	}
};

const generateButtons = () => {
	switch (CONFIG.bentoLayout) {
		case 'bento':
			generateFirstButtonsContainer();
			break;
		case 'buttons':
			generateFirstButtonsContainer();
			generateSecondButtonsContainer();
			break;
		default:
			break;
	}
};

generateButtons();
