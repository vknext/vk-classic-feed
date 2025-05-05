import watchGlobalProperty from '@vknext/shared/vkcom/globalVars/utils/watchGlobalProperty';
import type { VK } from 'src/global';
import InteractionListener from 'src/interactions/utils/InteractionListener';
import waitVK from 'src/lib/waitVK';

type CallbackFunc = (vk: VK) => void;
const interaction = new InteractionListener<CallbackFunc>();

let inited = false;
const onAddNewCallback = async (callback: CallbackFunc) => {
	if (inited) {
		await waitVK();
	} else {
		inited = true;

		watchGlobalProperty('vk', (vkValue) => {
			for (const callback of interaction.listeners) {
				try {
					callback(vkValue);
				} catch (e) {
					console.error(e);
				}
			}
		});
	}

	callback(window.vk);
};

const onChangeVK = (callback: CallbackFunc) => {
	const listener = interaction.addListener(callback);

	onAddNewCallback(callback);

	return listener;
};

export default onChangeVK;
