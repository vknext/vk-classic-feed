import createFancyElementTT from './createFancyElementTT';
import createPostVisibilityBestFriendsOnlyOption from './createPostVisibilityBestFriendsOnlyOption';

const createPostActionTTContent = () => {
	const postActionTTContent = document.createElement('div');
	postActionTTContent.className = 'post_action_tt_content';
	postActionTTContent.id = 'post_visibility_tt_content';

	postActionTTContent.append(
		createFancyElementTT({
			id: 'no_friends_only',
			value: 0,
			checked: true,
			label: 'Видно всем',
			onclick: `Wall.togglePostVisibilityAccess(event.target, 0, '')`,
		}),
		createFancyElementTT({
			id: 'friends_only',
			value: 1,
			checked: false,
			label: 'Видно друзьям',
			onclick: `Wall.togglePostVisibilityAccess(event.target, 1, '')`,
		}),
		createFancyElementTT({
			id: 'best_friends_only',
			value: 2,
			checked: false,
			label: createPostVisibilityBestFriendsOnlyOption(),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 2, '')`,
		})
	);

	return postActionTTContent;
};

export default createPostActionTTContent;
