const createPostField = () => {
	const postField = document.createElement('div');
	postField.id = 'post_field';
	postField.className = 'submit_post_field dark';

	postField.setAttribute('onkeyup', 'Wall && Wall.postChanged()');
	postField.setAttribute('onkeydown', 'onCtrlEnter(event, wall.sendPost)');
	postField.setAttribute('onfocus', 'wall && wall.showEditPost()');

	postField.setAttribute('placeholder', 'Что у вас нового?');
	postField.setAttribute('contenteditable', 'true');
	postField.setAttribute('role', 'textbox');
	postField.setAttribute('aria-multiline', 'true');
	postField.setAttribute('aria-label', 'Что у вас нового?');

	return postField;
};

export default createPostField;
