const createPostVisibilityBestFriendsOnlyOption = () => {
	const postVisibilityOption = document.createElement('div');
	postVisibilityOption.className = 'PostVisibilityBestFriendsOnlyOption';

	postVisibilityOption.innerHTML = `Для близких друзей<span class="PostVisibilityBestFriendsOnlyOption__info"><span class="PostVisibilityBestFriendsOnlyOption__editLink" role="button">Редактировать</span></span>`;

	return postVisibilityOption;
};

export default createPostVisibilityBestFriendsOnlyOption;
