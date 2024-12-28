import onAddModalPost from 'src/interactions/onAddModalPost';
import onAddWallPost from 'src/interactions/onAddWallPost';
import getReactAttrs from 'src/lib/getReactAttrs';
import createLikeViewsElement from './createLikeViewsElement';
import formatPostDate from './formatPostDate';
import * as styles from './styles/index.module.scss';
import tqsHook from './tqsHook';

const onAddPost = (post: HTMLElement) => {
	if (!post.querySelector('.PostCopyQuote--redesignV3')) {
		try {
			const postText = post.querySelector('[class*="PostText__root"]')?.parentElement;

			if (postText) {
				postText.style.padding = '0px 20px';

				const postContent = post.querySelector('[class*="PostContentContainer__contentContainer"]')!;

				postContent.prepend(postText);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const postHeaderInfo = post.querySelector<HTMLElement>('.PostHeaderInfo');
	if (!postHeaderInfo) return;

	const subtitle = post.querySelector<HTMLElement>('.PostHeaderSubtitle');

	for (const postDateBlock of post.querySelectorAll<HTMLElement>('.PostDateBlock__root:not(.ReactEntryRootClone)')) {
		if (postDateBlock.style.display === 'none') {
			postDateBlock.style.display = '';
		}

		if (subtitle) {
			subtitle.insertAdjacentElement('afterend', postDateBlock);
		} else {
			postHeaderInfo.appendChild(postDateBlock);
		}

		const postBottomActionLikeBtns = post.querySelector<HTMLElement>('.like_cont,.PostBottomActionLikeBtns');
		if (!postBottomActionLikeBtns) return;

		if (postBottomActionLikeBtns.getElementsByClassName('like_views').length) return;

		const { container } = getReactAttrs(postDateBlock);

		const props = container?.memoizedState?.element?.props;
		const viewsCount = props?.viewsCount;
		const date = props?.date;

		if (date) {
			const link = postDateBlock.querySelector<HTMLAnchorElement>('a,.vkuiLink');
			if (link) {
				link.innerText = formatPostDate(date, true);
			}
		}

		if (!viewsCount) {
			return;
		}

		const likeViews = createLikeViewsElement(viewsCount, post.dataset['postId']);

		postBottomActionLikeBtns.appendChild(likeViews);
	}
};

let inited = false;
const initOldPostDesign = () => {
	if (inited) return;
	inited = true;

	tqsHook().catch(console.error);

	onAddWallPost(onAddPost);
	onAddModalPost(onAddPost);

	document.documentElement.classList.add(styles.oldPostDesign);
};

try {
	initOldPostDesign();
} catch (e) {
	console.error(e);
}
