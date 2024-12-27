import DOMContentLoaded from 'src/lib/DOMContentLoaded';
import waitNav from 'src/lib/waitNav';
import waitRAF from 'src/lib/waitRAF';
import waitRIC from 'src/lib/waitRIC';
import InteractionListener from './utils/InteractionListener';

type CallbackFunc = (node: HTMLElement) => void;

const POST_SELECTOR = ['#wl_post', '.wl_post'].join(',');

const interaction = new InteractionListener<CallbackFunc>();

const onCallback = async (el: HTMLElement) => {
	for (const callback of interaction.listeners) {
		await waitRIC();
		callback(el);
	}
};

const getDocumentPosts = async () => {
	await waitRAF();

	return document.querySelectorAll<HTMLElement>(POST_SELECTOR);
};

const initListener = async (): Promise<void> => {
	const nav = await waitNav();

	nav.onLocationChange(async () => {
		if (nav.objLoc['w']) {
			for (const post of await getDocumentPosts()) {
				onCallback(post);
			}
		}
	});
};

let inited = false;
const onAddModalPost = (callback: CallbackFunc) => {
	const listener = interaction.addListener(callback);

	DOMContentLoaded(async () => {
		for (const post of await getDocumentPosts()) {
			callback(post);
		}
	});

	if (!inited) {
		inited = true;

		initListener();
	}

	return listener;
};

export default onAddModalPost;
