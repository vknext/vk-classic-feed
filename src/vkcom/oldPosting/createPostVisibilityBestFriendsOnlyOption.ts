const createPostVisibilityBestFriendsOnlyOption = (count: number) => {
	const postVisibilityOption = document.createElement('div');
	postVisibilityOption.className = 'PostVisibilityBestFriendsOnlyOption';
	postVisibilityOption.setAttribute('data-count', String(count));

	postVisibilityOption.innerHTML = `Для близких друзей<span class="PostVisibilityBestFriendsOnlyOption__info">${count} друга<span class="dvd"></span><span class="PostVisibilityBestFriendsOnlyOption__editLink" role="button">Редактировать</span></span>`;

	return postVisibilityOption;
};

export default createPostVisibilityBestFriendsOnlyOption;
