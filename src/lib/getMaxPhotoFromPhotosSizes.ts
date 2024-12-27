type PhotosPhotoSizesType =
	| 's'
	| 'm'
	| 'x'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 'k'
	| 'l'
	| 'y'
	| 'z'
	| 'c'
	| 'w'
	| 'a'
	| 'b'
	| 'e'
	| 'i'
	| 'd'
	| 'j'
	| 'temp'
	| 'h'
	| 'g'
	| 'n'
	| 'f'
	| 'max';

const photoTypeSizes: PhotosPhotoSizesType[] = [
	'a',
	'b',
	'i',
	'p',
	'q',
	's',
	'w',
	'z',
	'y',
	'x',
	'r',
	'o',
	'm',
	'g',
	'max',
	'l',
	'f',
	'k',
	'c',
	'e',
	'd',
	'j',
	'temp',
	'h',
	'n',
];

interface PhotosPhotoSizes {
	/**
	 * Height in px
	 */
	height: number;
	/**
	 * URL of the image
	 */
	url?: string;
	/**
	 * URL of the image
	 */
	src?: string;
	/**
	 * Width in px
	 */
	width: number;
	type: PhotosPhotoSizesType;
	[key: string]: any;
}

const getMaxPhotoFromPhotosSizes = (sizes: PhotosPhotoSizes[]) => {
	let maxSizePhoto: PhotosPhotoSizes | null = null;
	let maxSize = 0;

	for (const size of sizes) {
		const sizeType = size.type;

		if (photoTypeSizes.includes(sizeType)) {
			const currentSize = (size.width || 0) * (size.height || 0);

			if (currentSize > maxSize) {
				maxSize = currentSize;
				maxSizePhoto = size;
			}
		}
	}

	if (!maxSizePhoto) {
		return sizes[0];
	}

	return maxSizePhoto;
};

export default getMaxPhotoFromPhotosSizes;
