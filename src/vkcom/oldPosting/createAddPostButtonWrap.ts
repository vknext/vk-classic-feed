const createAddPostButtonWrap = (isSuggestPost: boolean) => {
	const addPostButtonWrap = document.createElement('div');
	addPostButtonWrap.className = 'addpost_button_wrap';

	const addPostButton = document.createElement('button');
	addPostButton.className = 'FlatButton FlatButton--primary FlatButton--size-m addpost_button';
	addPostButton.type = 'button';
	addPostButton.id = 'send_post';
	addPostButton.setAttribute('onclick', 'wall.sendPost()');

	const addPostButtonIn = document.createElement('span');
	addPostButtonIn.className = 'FlatButton__in';

	const addPostButtonContent = document.createElement('span');
	addPostButtonContent.className = 'FlatButton__content';
	addPostButtonContent.textContent = isSuggestPost ? 'Предложить новость' : 'Опубликовать';

	addPostButtonIn.appendChild(addPostButtonContent);
	addPostButton.appendChild(addPostButtonIn);
	addPostButtonWrap.appendChild(addPostButton);

	return addPostButtonWrap;
};

export default createAddPostButtonWrap;
