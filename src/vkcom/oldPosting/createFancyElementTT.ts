interface createFancyElementTTProps {
	id?: string;
	value: string;
	checked: boolean;
	label: string | HTMLElement;
	onclick?: string;
}

const createFancyElementTT = ({ id, value, checked, label, onclick }: createFancyElementTTProps) => {
	const fancyElementTTItem = document.createElement('div');
	fancyElementTTItem.className = `FancyElementTT__item radiobtn`;
	fancyElementTTItem.role = 'radio';
	fancyElementTTItem.setAttribute('data-value', value);
	fancyElementTTItem.setAttribute('aria-checked', checked ? '1' : '');

	if (onclick) {
		fancyElementTTItem.setAttribute('onclick', onclick);
	}

	if (id) {
		fancyElementTTItem.id = id;
		fancyElementTTItem.classList.add(`name_${id}`);
		fancyElementTTItem.setAttribute('name', id);
	} else if (checked) {
		fancyElementTTItem.classList.add('on');
	}

	if (typeof label === 'string') {
		fancyElementTTItem.setAttribute('aria-label', label);
	}

	if (checked) {
		const checkIcon = document.createElement('span');
		checkIcon.className = 'FancyElementTT__checkIcon';

		const svg = document.createElement('svg');
		svg.setAttribute('width', '16');
		svg.setAttribute('height', '16');
		svg.setAttribute('viewBox', '0 0 16 16');
		svg.setAttribute('fill', 'none');

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute(
			'd',
			'M13.74 3.76c.35.34.35.9 0 1.23l-7.31 7.25a.88.88 0 0 1-1.25 0L2.26 9.36a.87.87 0 0 1 0-1.23.88.88 0 0 1 1.24 0l2.3 2.26 6.7-6.63a.88.88 0 0 1 1.24 0Z'
		);
		path.setAttribute('fill', 'currentColor');

		svg.appendChild(path);

		checkIcon.appendChild(svg);

		fancyElementTTItem.appendChild(checkIcon);
	}

	const fancyElementTTItemLabel = document.createElement('div');
	fancyElementTTItemLabel.className = 'FancyElementTT__itemLabel';

	if (typeof label === 'string') {
		fancyElementTTItemLabel.textContent = label;
	} else if (label instanceof HTMLElement) {
		fancyElementTTItemLabel.appendChild(label);
	}

	fancyElementTTItem.appendChild(fancyElementTTItemLabel);

	return fancyElementTTItem;
};

export default createFancyElementTT;
