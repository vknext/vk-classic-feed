import createPostActionBtnText from './createPostActionBtnText';
import createPostActionImageBtn from './createPostActionImageBtn';
import createPostActionTTContent from './createPostActionTTContent';

const createPostActionsBtns = (isUser: boolean) => {
	const postActionsBtns = document.createElement('div');
	postActionsBtns.className = 'post_actions_btns';
	postActionsBtns.id = 'post_actions_btns';

	if (isUser) {
		const postVisibilityBtn = document.createElement('div');
		postVisibilityBtn.className = 'post_action_btn post_available';
		postVisibilityBtn.id = 'post_visibility_btn';
		const postActionsBtnsLayout = document.createElement('div');
		postActionsBtnsLayout.className = 'post_action_btn_layout';

		postActionsBtnsLayout.append(
			createPostActionBtnText(),
			createPostActionImageBtn(),
			createPostActionTTContent()
		);
		postVisibilityBtn.appendChild(postActionsBtnsLayout);

		postActionsBtns.appendChild(postVisibilityBtn);
	}

	return postActionsBtns;
};

export default createPostActionsBtns;
