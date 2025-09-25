export const removeAllButtonsExceptLast = (id: string) => {
	const elements = document.querySelectorAll(`#${id}`);

	elements.forEach((el, idx) => {
		if (idx !== elements.length - 1) {
			el.remove();
		}
	});
};
