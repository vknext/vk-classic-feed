import icon_done_16 from '@vkontakte/icons/src/svg/16/done_16.svg';
import parseSvg from 'src/lib/parseSvg';

interface createFancyElementTTProps {
	id?: string;
	value: string | number;
	checked: boolean;
	label: string | HTMLElement;
	onclick?: string;
}

const createFancyElementTT = ({ id, value, checked, label, onclick }: createFancyElementTTProps) => {
	const fancyElementTTItem = document.createElement('div');
	fancyElementTTItem.className = `FancyElementTT__item radiobtn`;
	fancyElementTTItem.role = 'radio';
	fancyElementTTItem.setAttribute('data-value', String(value));
	fancyElementTTItem.setAttribute('aria-checked', checked ? '1' : '');

	if (onclick) {
		fancyElementTTItem.setAttribute('onclick', onclick);
	}

	if (id) {
		fancyElementTTItem.id = id;
		fancyElementTTItem.classList.add(`name_${id}`);
		fancyElementTTItem.setAttribute('name', id);
	}

	if (typeof label === 'string') {
		fancyElementTTItem.setAttribute('aria-label', label);
	}

	if (checked) {
		fancyElementTTItem.classList.add('on');

		const checkIcon = document.createElement('span');
		checkIcon.className = 'FancyElementTT__checkIcon';

		const svg = parseSvg(icon_done_16);

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
