import type { HTMLHeadTaskQueueS } from 'src/lib/waitHTMLHead';
import InteractionListener from '../interactions/utils/InteractionListener';
import onAddTaskQueueS from './onAddTaskQueueS';

type CallbackFunc = (payload: any) => Promise<void> | void;

const interactionBefore = new InteractionListener<CallbackFunc>();
const interactionAfter = new InteractionListener<CallbackFunc>();

const postContentContainerInitDecorator = (fn: (...args: any) => void) => {
	return async (...rest: any) => {
		try {
			const payload = rest[0].payload;

			for (const callback of interactionBefore.listeners) {
				try {
					await callback(payload);
				} catch (e) {
					console.error(e);
				}
			}
		} catch (e) {
			console.error(e);
		}

		const result = fn.call(this, ...rest);

		try {
			const payload = rest[0].payload;

			for (const callback of interactionAfter.listeners) {
				try {
					callback(payload);
				} catch (e) {
					console.error(e);
				}
			}
		} catch (e) {
			console.error(e);
		}

		return result;
	};
};

const onAddTqs = async (tqs: HTMLHeadTaskQueueS) => {
	const originalHandlers = tqs._handlers;

	if (originalHandlers['PostContentContainer/init']) {
		originalHandlers['PostContentContainer/init'] = postContentContainerInitDecorator(
			originalHandlers['PostContentContainer/init']
		);
	}

	const handlersProxy = new Proxy(originalHandlers, {
		set(target, property: string, value) {
			if (property === 'PostContentContainer/init') {
				target[property] = postContentContainerInitDecorator(value);
				return true;
			}

			target[property] = value;

			return true;
		},
	});

	tqs._handlers = handlersProxy;
};

let inited = false;
const onPostContentContainerInit = (callback: CallbackFunc, after = false) => {
	const listener = after ? interactionAfter.addListener(callback) : interactionBefore.addListener(callback);

	if (!inited) {
		inited = true;

		onAddTaskQueueS(onAddTqs);
	}

	return listener;
};

export default onPostContentContainerInit;
