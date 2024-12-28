const createPostActionBtnText = () => {
	const postActionsBtnText = document.createElement('span');
	postActionsBtnText.className = 'post_action_btn_text';
	postActionsBtnText.setAttribute('role', 'button');
	postActionsBtnText.setAttribute('aria-label', 'Видно всем');
	postActionsBtnText.textContent = 'Видно всем';

	return postActionsBtnText;
};

export default createPostActionBtnText;
