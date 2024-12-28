const prefix = 'vcf_icon';
let iconCount = 0;

const parseSvg = (content: string) => {
	const hasImportNode = !!document.importNode;
	let svgElement = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

	if (hasImportNode) {
		svgElement = document.importNode(svgElement, true);
	}

	for (const node of svgElement.querySelectorAll(`title,desc`)) {
		node.remove();
	}

	for (const node of svgElement.querySelectorAll(`[id]`)) {
		if (!node.id) continue;

		const newNodeId = `${prefix}-${iconCount++}`;

		let isReplace = false;

		for (const el of svgElement.querySelectorAll(`[fill="url(#${node.id})"]`)) {
			el.setAttribute('fill', `url(#${newNodeId})`);
			isReplace = true;
		}

		if (isReplace) {
			node.id = newNodeId;
		}
	}

	return svgElement;
};

export default parseSvg;
