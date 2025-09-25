import { onDocumentComplete } from '@vknext/shared/utils/onDocumentComplete';
import type { ObservedHTMLElement } from 'src/global';
import delay from 'src/lib/delay';
import DOMContentLoaded from 'src/lib/DOMContentLoaded';
import waitCur from 'src/lib/waitCur';
import waitNav from 'src/lib/waitNav';
import waitRAF from 'src/lib/waitRAF';
import waitRIC from 'src/lib/waitRIC';
import onPostContentContainerInit from 'src/listeners/onPostContentContainerInit';
import InteractionListener from './utils/InteractionListener';

type CallbackFunc = (node: HTMLElement) => void;

const POST_SELECTOR = ['.Post--redesign', '.post', '._post:not(.reply)', '.Post', '.FeedBlockWrap'].join(',');
const WALL_MODULE_SELECTOR = [
	'.wall_module',
	'#public_wall',
	`div[data-testid="feed_main_container"] > .vkuiInternalGroup--mode-card`,
].join(',');
const PAGE_WALL_POSTS_SELECTOR = ['#page_wall_posts', '.page_wall_posts', '#page_donut_posts'].join(',');
const FEED_ROWS_SELECTOR = ['#feed_rows', '._feed_rows', 'div[role="feed"]'].join(',');

const interaction = new InteractionListener<CallbackFunc>();

const onCallback = async (el: HTMLElement) => {
	// элемент удалили из дома, например при переходе в другой раздел
	if (!el.closest('html,body')) return;

	if (el.getElementsByClassName('PostContentDumbSkeleton').length) {
		await delay(500);
		return onCallback(el);
	}

	for (const callback of interaction.listeners) {
		await waitRIC();
		callback(el);
	}
};

const onAddPost = (el: ObservedHTMLElement) => {
	if (el._vcf_ibs) return;

	const postContentContainer = el.querySelector<HTMLElement>('.PostContentContainer__root:not(.ReactEntryRootClone)');

	if (postContentContainer && postContentContainer.style.display !== 'none') {
		onCallback(el);
		return;
	}

	el._vcf_ibs = new IntersectionObserver(
		async (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					onCallback(el);

					if (el._vcf_ibs) {
						el._vcf_ibs.unobserve(el);

						delete el._vcf_ibs;
					}
				}
			}
		},
		{ threshold: 0, rootMargin: '800px 0% 800px 0%' }
	);

	el._vcf_ibs.observe(el);
};

const getDocumentPosts = async () => {
	await waitRAF();

	return document.querySelectorAll<HTMLElement>(POST_SELECTOR);
};

const validModules = ['feed', 'public', 'profile', 'wall', 'groups'];

let timeOut: NodeJS.Timeout | null = null;
const initObserver = async () => {
	if (timeOut !== null) {
		clearTimeout(timeOut);
		timeOut = null;
	}

	if (document.querySelector('#FeedPageSkeleton,[class*="PostSkeleton__root"]')) {
		timeOut = setTimeout(() => {
			timeOut = null;
			initObserver();
		}, 1000);

		return;
	}

	const wallModule = document.querySelectorAll<HTMLElement>(WALL_MODULE_SELECTOR);

	for (const row of wallModule) {
		await waitRIC();

		const feedRows = row.querySelector<ObservedHTMLElement>(FEED_ROWS_SELECTOR);

		if (feedRows) {
			if (feedRows.closest('.feed_wall--no-islands')) continue;

			if (feedRows._vcf_mbs) continue;

			feedRows._vcf_mbs = new MutationObserver(async (mutations) => {
				for (const mutation of mutations) {
					if (!mutation.addedNodes.length) continue;

					for (const node of mutation.addedNodes) {
						await waitRIC();

						const post = (node as HTMLElement).querySelector<HTMLElement>(POST_SELECTOR);
						if (!post) continue;

						onAddPost(post);
					}
				}
			});

			feedRows._vcf_mbs.observe(feedRows, {
				childList: true,
			});
		}
	}

	const pageWallPosts = document.querySelectorAll<ObservedHTMLElement>(PAGE_WALL_POSTS_SELECTOR);

	for (const wrapper of pageWallPosts) {
		if (wrapper._vcf_mbs) continue;

		await waitRIC();

		wrapper._vcf_mbs = new MutationObserver(async (mutations) => {
			for (const mutation of mutations) {
				if (!mutation.addedNodes.length) continue;

				for (const node of mutation.addedNodes) {
					await waitRIC();

					onAddPost(node as HTMLElement);
				}
			}
		});

		wrapper._vcf_mbs.observe(wrapper, {
			childList: true,
		});
	}

	await waitRIC();

	for (const post of await getDocumentPosts()) {
		onAddPost(post);
	}
};

const initListener = async (): Promise<void> => {
	const nav = await waitNav();
	const cur = await waitCur();

	nav.subscribeOnModuleEvaluated(async () => {
		await waitRAF();
		await waitRIC();

		const curModule = cur.module;

		if (curModule === 'profile') {
			await delay(1000);
		}

		initObserver();
	});

	if (cur?.module) {
		await new Promise<void>((resolve) => onDocumentComplete(resolve));
	}

	if (validModules.includes(cur.module) || cur.module === undefined) {
		await initObserver();
	}
};

const onAddPostContent = ({ target }: { target: HTMLElement }) => {
	const post = target.closest<HTMLElement>(POST_SELECTOR);

	if (post) {
		onAddPost(post);
	}
};

let inited = false;
const onAddWallPost = (callback: CallbackFunc) => {
	const listener = interaction.addListener(callback);

	DOMContentLoaded(async () => {
		const posts = await getDocumentPosts();
		for (const post of posts) {
			callback(post);
		}
	});

	if (!inited) {
		inited = true;

		onPostContentContainerInit(onAddPostContent, true);

		initListener();
	}

	return listener;
};

export default onAddWallPost;
