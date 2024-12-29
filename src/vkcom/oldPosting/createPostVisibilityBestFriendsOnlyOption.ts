const createPostVisibilityBestFriendsOnlyOption = () => {
	const postVisibilityOption = document.createElement('div');
	postVisibilityOption.className = 'PostVisibilityBestFriendsOnlyOption';

	const textNode = document.createTextNode('Для близких друзей');

	const infoSpan = document.createElement('span');
	infoSpan.className = 'PostVisibilityBestFriendsOnlyOption__info';

	const editLink = document.createElement('span');
	editLink.className = 'PostVisibilityBestFriendsOnlyOption__editLink';
	editLink.setAttribute('role', 'button');
	editLink.textContent = 'Редактировать';

	infoSpan.appendChild(editLink);

	postVisibilityOption.appendChild(textNode);
	postVisibilityOption.appendChild(infoSpan);

	return postVisibilityOption;
};

export default createPostVisibilityBestFriendsOnlyOption;
