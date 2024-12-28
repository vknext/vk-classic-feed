const createMediaPreview = () => {
	const mediaPreview = document.createElement('div');
	mediaPreview.id = 'media_preview';
	mediaPreview.className = 'clear_fix media_preview wall_post_media_preview';

	return mediaPreview;
};

export default createMediaPreview;
