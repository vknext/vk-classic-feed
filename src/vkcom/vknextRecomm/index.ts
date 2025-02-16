import getGlobalVKNext from 'src/getGlobalVKNext';
import waitFeed from 'src/globalVars/waitFeed';

const onLoadFeed = () => {
	if (getGlobalVKNext()?.webpack) return;

	const rmenu = document.getElementById('feed_rmenu');
	if (!rmenu) return;

	const sep = document.createElement('div');
	sep.className = 'ui_rmenu_sep';

	const item = document.createElement('a');
	item.href = 'https://vknext.net/?utm_source=vcf';
	item.target = '_blank';
	item.className = 'ui_rmenu_item';
	item.title = 'Больше возможностей доступно в расширении VK Next. Нажмите, чтобы ознакомиться.';

	const label = document.createElement('span');
	label.className = 'ui_rmenu_item_label';

	const labelText = document.createElement('span');
	labelText.className = 'ui_rmenu_label-text';
	labelText.textContent = 'VK Next';

	label.appendChild(labelText);
	item.appendChild(label);

	rmenu.append(sep, item);
};

const initVKNextRecomm = async () => {
	if (getGlobalVKNext()?.webpack) return;

	try {
		onLoadFeed();
	} catch (e) {
		console.error(e);
	}

	const feed = await waitFeed();

	const init = feed.init;

	feed.init = (...rest) => {
		const result = init.apply(feed, rest);

		if (result instanceof Promise) {
			result.then(onLoadFeed);
		} else {
			requestAnimationFrame(onLoadFeed);
		}

		return result;
	};
};

initVKNextRecomm().catch(console.error);
