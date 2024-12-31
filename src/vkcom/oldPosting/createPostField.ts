const createPostField = (isSuggestPost: boolean, onlyOfficial?: boolean) => {
	const getLabel = () => {
		if (!onlyOfficial) {
			return 'Напишите что-нибудь...';
		}

		if (isSuggestPost) {
			return 'Предложите новость';
		}

		return 'Что у вас нового?';
	};

	const postField = document.createElement('div');
	postField.id = 'post_field';
	postField.className = 'submit_post_field dark';

	postField.setAttribute('onkeyup', 'Wall && Wall.postChanged()');
	postField.setAttribute('onkeydown', 'onCtrlEnter(event, wall.sendPost)');
	postField.setAttribute('onfocus', 'wall && wall.showEditPost()');

	const label = getLabel();

	postField.setAttribute('placeholder', label);
	postField.setAttribute('contenteditable', 'true');
	postField.setAttribute('role', 'textbox');
	postField.setAttribute('aria-multiline', 'true');
	postField.setAttribute('aria-label', label);

	return postField;
};

export default createPostField;
