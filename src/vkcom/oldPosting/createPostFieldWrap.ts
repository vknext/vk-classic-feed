import createEmojiSmileWrap from './createEmojiSmileWrap';
import createPostField from './createPostField';
import createPostFieldWarning from './createPostFieldWarning';

const createPostFieldWrap = (isSuggestPost: boolean, onlyOfficial?: boolean) => {
	const postFieldWrap = document.createElement('div');
	postFieldWrap.className = 'post_field_wrap _emoji_field_wrap';

	const emojiSmileWrap = createEmojiSmileWrap();

	postFieldWrap.appendChild(emojiSmileWrap);

	const postField = createPostField(isSuggestPost, onlyOfficial);

	postFieldWrap.appendChild(postField);

	postFieldWrap.appendChild(createPostFieldWarning());

	return postFieldWrap;
};

export default createPostFieldWrap;
