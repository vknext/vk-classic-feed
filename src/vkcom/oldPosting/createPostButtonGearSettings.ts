import gear_outline_20 from '@vkontakte/icons/src/svg/20/gear_outline_20.svg';
import parseSvg from 'src/lib/parseSvg';

const createPostButtonGearSettings = () => {
	const postButtonGearSettings = document.createElement('span');
	postButtonGearSettings.setAttribute('onmouseover', 'Wall && Wall.showPostSettings(this, event);');
	postButtonGearSettings.id = 'post_button_gear_settings';
	postButtonGearSettings.className = 'PostOption PostSettings__gear';
	postButtonGearSettings.setAttribute('role', 'button');
	postButtonGearSettings.setAttribute('tabindex', '0');
	postButtonGearSettings.setAttribute('aria-label', 'Настройки публикации');

	const iconWrapper = document.createElement('span');
	iconWrapper.className = 'PostOption__iconWrapper';
	iconWrapper.id = 'post_icon_gear_settings';
	iconWrapper.appendChild(parseSvg(gear_outline_20));

	postButtonGearSettings.appendChild(iconWrapper);

	return postButtonGearSettings;
};

export default createPostButtonGearSettings;
