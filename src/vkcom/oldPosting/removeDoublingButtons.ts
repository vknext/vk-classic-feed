export const removeDoublingButtons = (id: string, lastAddMediaId: number) => {
	const elements = document.querySelectorAll(`[id^="${id}"]`);

	elements.forEach((el) => {
		const mediaId = Number(el.id.replace(id, ''));

		if (mediaId === lastAddMediaId) return;

		el.remove();
	});
};
