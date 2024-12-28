import user_outline_20 from '@vkontakte/icons/src/svg/20/user_outline_20.svg';
import parseSvg from 'src/lib/parseSvg';

const createOptionCheckSignPic = () => {
	const option = document.createElement('div');
	option.className = 'checkbox_pic check_sign_pic PostOption';
	option.id = 'check_sign';
	option.setAttribute('onclick', 'Wall && Wall.saveCheckSign(this)');
	option.setAttribute('onmouseover', 'showTitle(this, false, [10,10], {noZIndex: true});');
	option.setAttribute('role', 'checkbox');
	option.setAttribute('aria-checked', 'false');
	option.setAttribute('tabindex', '0');

	if (window.getLang) {
		option.setAttribute('data-title', window.getLang('wall_check_sign_disabled'));
		option.setAttribute('aria-label', window.getLang('wall_check_sign_enabled'));
	}

	const blindLabel = document.createElement('span');
	blindLabel.className = 'blind_label';
	blindLabel.textContent = 'Убирать подпись при редактировании записи';

	const iconWrapper = document.createElement('span');
	iconWrapper.className = 'PostOption__iconWrapper';
	iconWrapper.appendChild(parseSvg(user_outline_20));

	option.append(blindLabel, iconWrapper);

	return option;
};

export default createOptionCheckSignPic;
