const Ranges = Object.freeze({
	isUserId: (peer_id: number) => {
		return (peer_id >= 1 && peer_id < 1.9e9) || (peer_id >= 200e9 && peer_id < 100e10);
	},
	isGroupId: (peer_id: number) => {
		return peer_id <= -1 && peer_id > -1e9;
	},
	isChatId: (peer_id: number) => {
		return peer_id > 2e9 && peer_id < 2e9 + 1e8;
	},
	convertChatPeerIdToChatId: (value: number) => {
		return value - 2e9;
	},
	convertChatIdToChatPeerId: (value: number) => {
		return value + 2e9;
	},
	isZeroOwner: (value: number) => {
		return value === 0;
	},
	isUserIdTransitional: (value: number) => {
		Ranges.isUserId(value);

		return 0 < value && value < 2e9;
	},
});

export default Ranges;
