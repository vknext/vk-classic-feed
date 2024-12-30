import type { Wall } from 'src/global';
import InteractionListener from 'src/interactions/utils/InteractionListener';

type CallbackFunc = (wall: Wall) => void;

const interaction = new InteractionListener<CallbackFunc>();

let inited = false;
const initHook = () => {
	if (inited) return;
	inited = true;

	let oldWall = window.Wall;

	Object.defineProperty(window, 'Wall', {
		get: () => oldWall,
		set: (newWall: Wall) => {
			oldWall = newWall;

			for (const callback of interaction.listeners) {
				try {
					callback(newWall);
				} catch (e) {
					console.error(e);
				}
			}

			return true;
		},
		configurable: true,
	});
};

const onAddWall = (callback: CallbackFunc) => {
	const listener = interaction.addListener(callback);

	if (window.Wall) {
		try {
			callback(window.Wall);
		} catch (e) {
			console.error(e);
		}
	}

	initHook();

	return listener;
};

export default onAddWall;
