// ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
// ├┴┐│ │ │  │ │ ││││└─┐
// └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘
// Function to print Button Cards.

const generateFirstButtonsContainer = () => {
	for (const button of CONFIG.firstButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button button__${button.id}" id="${button.id}-1" title="${button.name}"
        >
          <i class="buttonIcon" icon-name="${button.icon}"></i>
		  <span>&nbsp;${button.name}</span>
		  <a href="#">
		  	<button class="button-edite" id="${button.id}-1">
			  <i icon-name="pencil"></i>
			</button>
		  </a>
        </a>
    `;

		const position = 'beforeend';

		buttons_1.insertAdjacentHTML(position, item);
	}
};

const generateSecondButtonsContainer = () => {
	for (const button of CONFIG.secondButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button button__${button.id}" id="${button.id}-2" title="${button.name}"
        >
          <i class="buttonIcon" icon-name="${button.icon}"></i>
		  <span>&nbsp;${button.name}</span>
		  <a href="#">
			<button class="button-edite" id="${button.id}-2">
			  <i icon-name="pencil"></i>
			</button>
		  </a>
        </a>
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
