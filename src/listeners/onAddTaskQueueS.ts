import delay from 'src/lib/delay';
import waitHTMLHead, { type HTMLHeadTaskQueueS } from 'src/lib/waitHTMLHead';
import waitNav from 'src/lib/waitNav';
import InteractionListener from '../interactions/utils/InteractionListener';

type CallbackFunc = (tqs: HTMLHeadTaskQueueS) => void;

const interaction = new InteractionListener<CallbackFunc>();

const getTqs = async () => {
	const head = await waitHTMLHead();

	if (!head._vcf_tqs) {
		await delay(1000);
		return getTqs();
	}

	return head._vcf_tqs;
};

const initHeadHook = async () => {
	const tqs = await getTqs();

	if (tqs._vcf_tqs) return;
	tqs._vcf_tqs = true;

	for (const callback of interaction.listeners) {
		try {
			callback(tqs);
		} catch (e) {
			console.error(e);
		}
	}
};

const initNavHook = async () => {
	const nav = await waitNav();

	nav.onLocationChange(initHeadHook);
};

let inited = false;
const onAddNewCallback = async (callback: CallbackFunc) => {
	if (!inited) {
		inited = true;

		await initHeadHook();

		initNavHook().catch(console.error);
	}

	callback(await getTqs());
};

const onAddTaskQueueS = (callback: CallbackFunc) => {
	const listener = interaction.addListener(callback);

	onAddNewCallback(callback);

	return listener;
};

export default onAddTaskQueueS;
