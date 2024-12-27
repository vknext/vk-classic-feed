const convertThousands = (num: number) => {
	let strnum = num + '';
	if (num > 1e9) strnum = (num / 1e9).toFixed(1).toString().replace('.', ',') + 'B';
	else if (num > 1e6) strnum = (num / 1e6).toFixed(1).toString().replace('.', ',') + 'M';
	else if (num > 1e3) strnum = (num / 1e3).toFixed(1).toString().replace('.', ',') + 'K';
	if (strnum.includes(',0')) strnum = strnum.slice(0, -3) + strnum.at(-1);
	return strnum;
};

export default convertThousands;
