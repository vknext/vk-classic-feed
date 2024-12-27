import convertThousands from 'src/lib/convertThousands';

const formatViewCount = (viewCount: number): string => {
	if (!window.getLang) return String(viewCount);

	return window.getLang('like_N_people_viewed', viewCount);
};

const createLikeViewsElement = (viewCount: number, postId?: string) => {
	const likeViewsContainer = document.createElement('div');
	likeViewsContainer.className = 'like_views like_views--inActionPanel';
	likeViewsContainer.setAttribute('role', 'img');
	likeViewsContainer.setAttribute('title', formatViewCount(viewCount));

	if (postId) {
		likeViewsContainer.setAttribute('onmouseover', `Likes && Likes.updateViews('wall${postId}', event);`);
	}

	const iconContainer = document.createElement('span');
	iconContainer.className = 'like_views__icon';

	const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgIcon.setAttribute('fill', 'none');
	svgIcon.setAttribute('height', '16');
	svgIcon.setAttribute('viewBox', '0 0 16 16');
	svgIcon.setAttribute('width', '16');
	svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	const iconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	iconGroup.setAttribute('fill', 'currentColor');

	const iconPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	iconPath1.setAttribute('d', 'M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z');

	const iconPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	iconPath2.setAttribute('clip-rule', 'evenodd');
	iconPath2.setAttribute(
		'd',
		'M15.5 8c0-1-3-5-7.5-5S.5 7 .5 8s3 5 7.5 5 7.5-4 7.5-5zm-4 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z'
	);
	iconPath2.setAttribute('fill-rule', 'evenodd');

	iconGroup.appendChild(iconPath1);
	iconGroup.appendChild(iconPath2);

	svgIcon.appendChild(iconGroup);

	iconContainer.appendChild(svgIcon);

	const viewsCountElement = document.createElement('span');
	viewsCountElement.className = '_views';
	viewsCountElement.setAttribute('data-count', String(viewCount));
	viewsCountElement.textContent = convertThousands(viewCount);

	likeViewsContainer.appendChild(iconContainer);
	likeViewsContainer.appendChild(viewsCountElement);

	return likeViewsContainer;
};

export default createLikeViewsElement;
