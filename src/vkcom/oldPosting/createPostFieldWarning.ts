const createPostFieldWarning = () => {
	const postFieldWarning = document.createElement('span');
	postFieldWarning.className = 'post_field_warning';

	return postFieldWarning;
};

export default createPostFieldWarning;
