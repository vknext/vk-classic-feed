import Ranges from 'src/lib/Ranges';
import createAddPostButtonWrap from './createAddPostButtonWrap';
import createAvatarRich from './createAvatarRich';
import createMediaInfo from './createMediaInfo';
import createMediaPreview from './createMediaPreview';
import createOptionCheckSignPic from './createOptionCheckSignPic';
import createPostActionsBtns from './createPostActionsBtns';
import createPostButtonGearSettings from './createPostButtonGearSettings';
import createPostFieldWrap from './createPostFieldWrap';
import createPostSettingsItems from './createPostSettingsItems';
import createSubmitPostError from './createSubmitPostError';

interface Options {
	oid: number;
	fromOid: number;
	ownerName?: string;
	ownerPhoto?: string;
	ownerHref?: string;
	isSuggestPost: boolean;
	onlyOfficial?: boolean;
}

const createSubmitPostBox = ({
	oid,
	fromOid,
	ownerName = '',
	ownerPhoto = '',
	ownerHref = '',
}: Pick<Options, 'oid' | 'fromOid' | 'ownerName' | 'ownerPhoto' | 'ownerHref'>) => {
	const submitPostBox = document.createElement('div');
	submitPostBox.id = 'submit_post_box';
	submitPostBox.className = 'submit_post_box clear_fix _submit_post_box';
	submitPostBox.setAttribute('data-from-oid', String(fromOid) || '');
	submitPostBox.setAttribute('data-oid', String(oid) || '');
	submitPostBox.setAttribute('data-owner-name', ownerName);
	submitPostBox.setAttribute('data-owner-photo', ownerPhoto);
	submitPostBox.setAttribute('data-owner-href', ownerHref);
	submitPostBox.setAttribute(
		'onclick',
		"if(domClosest('article_snippet', event.target)) return;return cancelEvent(event)"
	);

	if (Ranges.isUserId(oid)) {
		submitPostBox.classList.add('submit_post_box_with_sitposting');
	}
	return submitPostBox;
};

const createPostFieldUserLink = ({
	ownerHref = '',
	ownerPhoto = '',
}: Pick<Options, 'ownerHref' | 'ownerPhoto' | 'onlyOfficial'>) => {
	const postFieldUserLink = document.createElement('a');
	postFieldUserLink.href = ownerHref;
	postFieldUserLink.className = 'post_field_user_link _post_field_author';
	postFieldUserLink.setAttribute(
		'onclick',
		'if (!checkEvent(event)) return nav.go(this, event); event.cancelBubble = true;'
	);

	const avatarRich = createAvatarRich(ownerPhoto);
	postFieldUserLink.appendChild(avatarRich);

	const avatarRichSecondary = createAvatarRich(ownerPhoto);
	avatarRichSecondary.classList.add('post_field_image_secondary');
	postFieldUserLink.appendChild(avatarRichSecondary);

	return postFieldUserLink;
};

const createPostSettings = (isGroup: boolean, isSuggestPost: boolean, onlyOfficial?: boolean) => {
	const postSettings = document.createElement('div');
	postSettings.className = 'post_settings PostSettings';
	postSettings.id = 'post_settings_btn';

	if (!isSuggestPost) {
		postSettings.appendChild(createPostButtonGearSettings());
	}

	postSettings.appendChild(createPostSettingsItems(isGroup, onlyOfficial));

	return postSettings;
};

const createSubmitPost = (isGroup: boolean, isSuggestPost: boolean, onlyOfficial?: boolean) => {
	const submitPost = document.createElement('div');
	submitPost.id = 'submit_post';
	submitPost.className = 'submit_post clear_fix';
	submitPost.setAttribute(
		'onclick',
		"if(domClosest('article_snippet', event.target)) return;event.cancelBubble=true;"
	);

	submitPost.append(createAddPostButtonWrap(isSuggestPost), createPostSettings(isGroup, isSuggestPost, onlyOfficial));

	if (isSuggestPost) {
		submitPost.appendChild(createOptionCheckSignPic());
	}

	const pageAddMedia = document.createElement('div');
	pageAddMedia.id = 'page_add_media';
	pageAddMedia.className = 'page_add_media';
	pageAddMedia.setAttribute('onclick', 'wall && wall.showEditPost()');
	submitPost.appendChild(pageAddMedia);

	return submitPost;
};

const createPageBlockSubmitPost = ({
	oid,
	fromOid,
	ownerName,
	ownerPhoto,
	ownerHref,
	isSuggestPost,
	onlyOfficial,
}: Options): HTMLElement => {
	const isUser = Ranges.isUserId(oid);

	const pageBlock = document.createElement('div');
	pageBlock.className = 'page_block';
	pageBlock.id = 'page_block_submit_post';

	if (!isUser) {
		pageBlock.setAttribute('data-tooltip-id', 'business_groups_web:make_post');
	}

	const submitPostBox = createSubmitPostBox({
		oid,
		fromOid,
		ownerName,
		ownerPhoto,
		ownerHref,
	});

	submitPostBox.append(
		createSubmitPostError(),
		createPostFieldUserLink({ ownerHref, ownerPhoto }),
		createPostFieldWrap(isSuggestPost, onlyOfficial),
		createMediaPreview(),
		createMediaInfo(),
		createPostActionsBtns(isUser),
		createSubmitPost(!isUser, isSuggestPost, onlyOfficial)
	);

	pageBlock.appendChild(submitPostBox);

	return pageBlock;
};

export default createPageBlockSubmitPost;
