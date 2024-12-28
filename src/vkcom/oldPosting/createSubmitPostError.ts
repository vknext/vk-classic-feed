const createSubmitPostError = () => {
	const submitPostError = document.createElement('div');
	submitPostError.id = 'submit_post_error';
	submitPostError.className = 'error';

	return submitPostError;
};

export default createSubmitPostError;
