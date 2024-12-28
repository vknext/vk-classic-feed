import add_20 from '@vkontakte/icons/src/svg/20/add_20.svg';
import createPostCopyrightButtonIcon from './createPostCopyrightButtonIcon';

const createPostSourceButton = () => {
	const postCopyrightButton = document.createElement('a');
	postCopyrightButton.className = 'Post__copyrightButton';
	postCopyrightButton.id = 'post-copyright-button';

	const postCopyrightButtonIcon = createPostCopyrightButtonIcon(add_20);
	postCopyrightButton.appendChild(postCopyrightButtonIcon);

	const postCopyrightButtonText = document.createElement('span');
	postCopyrightButtonText.className = 'Post__copyrightButtonText';
	postCopyrightButtonText.textContent = window.getLang('wall_post_copyright_add_button');
	postCopyrightButton.appendChild(postCopyrightButtonText);

	return postCopyrightButton;
};

export default createPostSourceButton;
