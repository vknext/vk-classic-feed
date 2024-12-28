import advertising_check_outline_20 from '@vkontakte/icons/src/svg/20/advertising_check_outline_20.svg';
import advertising_outline_20 from '@vkontakte/icons/src/svg/20/advertising_outline_20.svg';
import createPostCopyrightButtonIcon from './createPostCopyrightButtonIcon';

const createPostCopyrightButton = () => {
	const postCopyrightButton = document.createElement('a');
	postCopyrightButton.className = 'Post__copyrightButton';
	postCopyrightButton.id = 'ads_ord_mini_app_option';
	postCopyrightButton.setAttribute('onclick', 'Wall && Wall.openMarkAsAdsOrdMiniApp(this)');

	const ordPredId = document.createElement('input');
	ordPredId.type = 'hidden';
	ordPredId.name = 'ord_pred_id';
	postCopyrightButton.appendChild(ordPredId);

	const erid = document.createElement('input');
	erid.type = 'hidden';
	erid.name = 'erid';
	postCopyrightButton.appendChild(erid);

	const postCopyrightButtonIconWithoutAds = createPostCopyrightButtonIcon(advertising_outline_20);
	postCopyrightButtonIconWithoutAds.classList.add('withoutAds');
	postCopyrightButton.appendChild(postCopyrightButtonIconWithoutAds);

	const postCopyrightButtonIconWithAds = createPostCopyrightButtonIcon(advertising_check_outline_20);
	postCopyrightButtonIconWithAds.classList.add('withAds');
	postCopyrightButton.appendChild(postCopyrightButtonIconWithAds);

	const postCopyrightButtonTextWithoutAds = document.createElement('span');
	postCopyrightButtonTextWithoutAds.className = 'Post__copyrightButtonText withoutAds';
	postCopyrightButtonTextWithoutAds.textContent = 'Отметить рекламу';
	postCopyrightButton.appendChild(postCopyrightButtonTextWithoutAds);

	const postCopyrightButtonTextWithAds = document.createElement('span');
	postCopyrightButtonTextWithAds.className = 'Post__copyrightButtonText withAds';
	postCopyrightButtonTextWithAds.textContent = 'Изменить отметку о рекламе';
	postCopyrightButton.appendChild(postCopyrightButtonTextWithAds);

	return postCopyrightButton;
};

export default createPostCopyrightButton;
