import createPostCopyrightButton from './createPostCopyrightButton';
import createPostSourceButton from './createPostSourceButton';

const createPostSettingsItems = (isGroup: boolean, onlyOfficial?: boolean) => {
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

	if (!onlyOfficial) {
		const official = document.createElement('div');
		official.className = 'checkbox on';
		official.id = 'official';
		official.setAttribute('onclick', 'Wall && Wall.checkAsGroup(this)');
		official.setAttribute('role', 'checkbox');
		official.setAttribute('aria-checked', 'true');
		official.setAttribute('tabindex', '0');
		official.setAttribute('aria-label', 'от имени сообщества');
		official.textContent = window.getLang?.('global_on_behalf_group') || 'От имени сообщества';
		postSettingsItems.prepend(official);
	}

	postSettingsItems.append(createPostCopyrightButton(), createPostSourceButton());

	return postSettingsItems;
};

export default createPostSettingsItems;
