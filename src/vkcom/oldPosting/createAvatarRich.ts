const createAvatarRich = (src = '') => {
	const avatarRich = document.createElement('span');
	avatarRich.className = 'AvatarRich AvatarRich--sz-28 AvatarRich--shadow post_field_user_image _post_field_image';
	avatarRich.style.cssText =
		'width: 28px; height: 28px; border-radius: 50%; --avatar-rich-stroke-width: 1.5px; --avatar-rich-nft-frame-width: 2px;';
	avatarRich.setAttribute('aria-hidden', 'true');
	avatarRich.setAttribute(
		'onclick',
		'if (!checkEvent(event)) return nav.go(this, event); event.cancelBubble = true;'
	);

	const avatarBackground = document.createElement('div');
	avatarBackground.className = 'AvatarRich__background';

	const avatarImg = document.createElement('img');
	avatarImg.src = src;
	avatarImg.alt = '';
	avatarImg.className = 'AvatarRich__img';

	avatarRich.append(avatarBackground, avatarImg);

	return avatarRich;
};

export default createAvatarRich;
