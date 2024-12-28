import parseSvg from 'src/lib/parseSvg';
import dropdown_12 from '@vkontakte/icons/src/svg/12/dropdown_12.svg';

const createPostActionImageBtn = () => {
	const postActionImageBtn = document.createElement('span');
	postActionImageBtn.className = 'post_action_image_btn';

	const svg = parseSvg(dropdown_12);

	postActionImageBtn.appendChild(svg);

	return postActionImageBtn;
};

export default createPostActionImageBtn;
