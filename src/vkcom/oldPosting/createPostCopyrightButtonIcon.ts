import parseSvg from 'src/lib/parseSvg';

const createPostCopyrightButtonIcon = (icon: string) => {
	const buttonIcon = document.createElement('span');
	buttonIcon.className = 'Post__copyrightButtonIcon';

	buttonIcon.appendChild(parseSvg(icon));

	return buttonIcon;
};

export default createPostCopyrightButtonIcon;
