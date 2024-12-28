import createEmojiSmileWrap from './createEmojiSmileWrap';
import createPostField from './createPostField';

const createPostFieldWrap = () => {
	const postFieldWrap = document.createElement('div');
	postFieldWrap.className = 'post_field_wrap _emoji_field_wrap';

	const emojiSmileWrap = createEmojiSmileWrap();

	postFieldWrap.appendChild(emojiSmileWrap);

	const postField = createPostField();

	postFieldWrap.appendChild(postField);

	return postFieldWrap;
};

export default createPostFieldWrap;
