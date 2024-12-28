import createPostCopyrightButton from './createPostCopyrightButton';

const createPostSettingsItems = (isGroup: boolean) => {
	const postSettingsItems = document.createElement('div');
	postSettingsItems.className = '_post_settings_items';

	const closeComments = document.createElement('div');
	closeComments.className = 'checkbox';
	closeComments.id = 'close_comments';
	closeComments.setAttribute('onclick', 'checkbox(this)');
	closeComments.textContent = 'Выключить комментарии';
	postSettingsItems.appendChild(closeComments);

	if (isGroup) {
		const signed = document.createElement('div');
		signed.className = 'checkbox';
		signed.id = 'signed';
		signed.setAttribute('onclick', 'checkbox(this); Wall && Wall.postChanged(true);');
		signed.textContent = 'Подпись';
		postSettingsItems.appendChild(signed);
	}

	const muteNotifications = document.createElement('div');
	muteNotifications.className = 'checkbox';
	muteNotifications.id = 'mute_notifications';
	muteNotifications.setAttribute('onclick', 'checkbox(this)');
	muteNotifications.textContent = 'Не отправлять уведомления';
	postSettingsItems.appendChild(muteNotifications);

	postSettingsItems.appendChild(createPostCopyrightButton());

	return postSettingsItems;
};

export default createPostSettingsItems;
