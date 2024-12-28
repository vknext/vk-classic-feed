import smile_outline_24 from '@vkontakte/icons/src/svg/24/smile_outline_24.svg';
import parseSvg from 'src/lib/parseSvg';

const createEmojiSmileWrap = () => {
	const emojiWrap = document.createElement('div');
	emojiWrap.className = 'emoji_smile_wrap _emoji_wrap';

	const emojiSmile = document.createElement('div');
	emojiSmile.className = 'emoji_smile _emoji_btn';
	emojiSmile.role = 'button';
	emojiSmile.title = window.getLang?.('wall_reply_emoji_hint') || '';
	emojiSmile.setAttribute('onmouseenter', 'return Emoji.show(this, event);');
	emojiSmile.setAttribute('onmouseleave', 'return Emoji.hide(this, event);');
	emojiSmile.setAttribute('onclick', 'return cancelEvent(event);');
	emojiSmile.setAttribute('aria-label', 'Add emoji or sticker');

	const emojiIcon = document.createElement('div');
	emojiIcon.className = 'emoji_smile_icon_inline_svg emoji_smile_icon';

	const emojiSvg = parseSvg(smile_outline_24);

	emojiIcon.appendChild(emojiSvg);
	emojiSmile.appendChild(emojiIcon);
	emojiWrap.appendChild(emojiSmile);

	return emojiWrap;
};

export default createEmojiSmileWrap;
