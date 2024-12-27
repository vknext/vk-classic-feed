import getMaxPhotoFromPhotosSizes from 'src/lib/getMaxPhotoFromPhotosSizes';
import humanFileSize from 'src/lib/humanFileSize';
import onPostContentContainerInit from 'src/listeners/onPostContentContainerInit';

const tqsHook = async () => {
	onPostContentContainerInit(async (payload) => {
		const data = payload.data;
		const item = data.item;

		let hasAudio = false;

		if (item.attachments) {
			for (const attachment of item.attachments) {
				const isOnMediaOrFull = attachment.style === 'on_media' || attachment.style === 'full';

				if (attachment.type === 'audio' && isOnMediaOrFull) {
					hasAudio = true;

					const audio = attachment.audio;
					const thumb = audio?.thumb;

					attachment.style = 'compact';
					attachment.compact = {
						icons: [
							{
								name: 'song_outline',
								sizes: [],
							},
						],
						title: {
							text: {
								text: audio.title,
							},
						},
						description: {
							text: {
								text: audio.artist,
							},
						},
					};

					if (thumb?.photo_270) {
						attachment.compact.icons[0].sizes.push({
							height: 270,
							type: 'x',
							width: 270,
							url: thumb.photo_270,
						});
					}
				}

				if (attachment.type === 'audio_playlist' && isOnMediaOrFull) {
					hasAudio = true;

					const audioPlaylist = attachment.audio_playlist;
					const photo = audioPlaylist?.photo;

					attachment.style = 'compact';
					attachment.compact = {
						icons: [
							{
								name: 'playlist_outline',
								sizes: [],
							},
						],
						title: {
							text: {
								text: audioPlaylist.title,
							},
						},
						description: {
							text: {
								text: audioPlaylist.description,
							},
						},
					};

					if (photo?.photo_270) {
						attachment.compact.icons[0].sizes.push({
							height: 270,
							type: 'x',
							width: 270,
							url: photo.photo_270,
						});
					}
				}

				if (attachment.type === 'doc' && attachment.style === 'chip') {
					const doc = attachment.doc;

					attachment.style = 'compact';
					attachment.compact = {
						icons: [
							{
								name: 'document_outline',
								sizes: [],
							},
						],
						title: {
							text: {
								text: doc.title,
							},
						},
						description: {
							text: {
								text: humanFileSize(doc.size),
							},
						},
					};

					if (doc.preview?.photo?.sizes) {
						const maxPhoto = getMaxPhotoFromPhotosSizes(doc.preview.photo.sizes);

						attachment.compact.icons[0].sizes.push({
							height: 270,
							type: 'x',
							width: 270,
							url: maxPhoto.src,
						});
					}
				}
			}
		}

		if (hasAudio) {
			if (item.compact_attachments_before_cut === 0) {
				item.compact_attachments_before_cut = 1;
			}
		}

		if (!data.attachmentsExpanded) {
			data.attachmentsExpanded = true;
		}
	});
};

export default tqsHook;
