import type { WallInitProps } from 'src/global';
import onAddWall from 'src/globalVars/onAddWall';
import DOMContentLoaded from 'src/lib/DOMContentLoaded';
import Ranges from 'src/lib/Ranges';
import waitNav from 'src/lib/waitNav';
import onChangeVKPart from 'src/listeners/onChangeVKPart';
import createPageBlockSubmitPost from './createPageBlockSubmitPost';

const onWallInit = async ({ wall_oid, public_link, loc, owner, wall_tpl }: WallInitProps) => {
	const newPageBlockSubmitPost = document.querySelector<HTMLElement>('#page_block_submit_post.new_posting');
	const gtopPageBlockSubmitPost = document.querySelector<HTMLElement>(
		'#page_block_submit_post:has(> .gtop_complex_message)'
	);
	const mainFeed = document.getElementById('main_feed');

	if (document.getElementsByClassName('submit_post_field').length) return;

	if (!mainFeed && !newPageBlockSubmitPost && !gtopPageBlockSubmitPost) return;

	const [ownerId, ownerPhoto, ownerHref, ownerName] = wall_tpl?.ownerData || [];
	const [profileId, profilePhoto, profileHref] = wall_tpl?.profileData || [];

	if (!window.templates) {
		window.templates = {};
	}

	if (!window.templates['primary_attachments_view_template']) {
		window.templates['primary_attachments_view_template'] =
			'<div class="post_action_btn primary_attachments_view" id=\'primary_attachments_view_btn%link_id%\' style=\'display: none;\'>\n  <div class="post_action_btn_layout">\n    <span class="post_action_btn_text" role="button" aria-label="Сетка">Сетка</span>\n    <span class="post_action_image_btn"><svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fill-rule="evenodd"/></svg></span>\n    <div class="post_action_tt_content">\n      <div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'Сетка\' data-value=\'grid\'>\n  \n  <div class="FancyElementTT__itemLabel">Сетка</div>\n</div><div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'Карусель\' data-value=\'carousel\'>\n  \n  <div class="FancyElementTT__itemLabel">Карусель</div>\n</div>\n    </div>\n  </div>\n</div>';
	}

	const oid = wall_oid || ownerId || profileId;

	const submitPostBlock = createPageBlockSubmitPost({
		isSuggestPost: wall_oid !== (ownerId || profileId) && Ranges.isGroupId(oid),
		oid,
		fromOid: oid,
		ownerHref: ownerHref || public_link || loc || (owner?.id ? `id${owner.id}` : undefined) || profileHref,
		ownerPhoto: ownerPhoto || owner?.photo || profilePhoto,
		ownerName,
	});

	if (newPageBlockSubmitPost) {
		newPageBlockSubmitPost.parentElement!.insertBefore(submitPostBlock, newPageBlockSubmitPost);

		newPageBlockSubmitPost.remove();
	}

	if (mainFeed) {
		mainFeed.parentElement!.prepend(submitPostBlock);

		const postingBlock = document.querySelector<HTMLElement>('.PostingReactBlock__root');

		if (postingBlock) {
			postingBlock.remove();
		}
	}

	if (gtopPageBlockSubmitPost) {
		gtopPageBlockSubmitPost.insertAdjacentElement('afterend', submitPostBlock);

		const postingBlock = gtopPageBlockSubmitPost.querySelector<HTMLElement>('.PostingReactBlock__root');

		if (postingBlock) {
			postingBlock.remove();
		}
	}
};

const showErrorInject = (mainFeed?: HTMLElement | null) => {
	if (window.Notifier?.showEvent) {
		const text = [
			mainFeed
				? 'Не удалось внедрить старый постинг. Перезайдите в раздел для повторной попытки.'
				: 'Не удалось внедрить старый постинг. Перезагружаем раздел для повторной попытки...',
		];

		const oldPostingNotifyCount = parseInt(localStorage.getItem('oldPostingNotifyCountVCF') || '0') || 0;
		if (oldPostingNotifyCount > 2) {
			return;
		}

		if (oldPostingNotifyCount === 2) {
			text.push(
				'<br/><br/>',
				'Это уведомление больше не появится. Пожалуйста, запомните, что расширение иногда будет перезагружать разделы для внедрения старого постинга.'
			);
		}

		window.Notifier.showEvent({
			title: 'VK Classic Feed',
			text: text.join('\n'),
		});

		localStorage.setItem('oldPostingNotifyCountVCF', (oldPostingNotifyCount + 1).toString());
	}
};

onChangeVKPart(() => {
	if (!window.vk?.pe) return;

	// форсим редактирование поста через window.Wall.edit
	delete window.vk.pe.posting_web_react_form;

	// возвращаем источник
	delete window.vk.pe.posting_hide_copyright_button_web;
});

onAddWall((wall) => {
	if (wall._cvf_hooked) return;
	wall._cvf_hooked = true;

	const init = wall.init;

	wall.init = async (...rest) => {
		try {
			await onWallInit(rest[0]);
		} catch (e) {
			console.error(e);
		}

		return init.apply(wall, rest);
	};
});

DOMContentLoaded(async () => {
	const nav = await waitNav();

	if (document.getElementById('submit_post_box')) return;
	if (document.getElementsByClassName('PostingReactBlock__root').length === 0) return;

	const mainFeed = document.getElementById('main_feed');

	try {
		showErrorInject(mainFeed);
	} catch (e) {
		console.error(e);
	}

	if (mainFeed) {
		return;
	}

	nav.go(nav.objLoc, null, {
		noback: true,
		replace: true,
		preventScroll: true,
	});
});
