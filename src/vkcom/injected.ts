import './injected.scss';

(window.vknext = window.vknext || {}).cvf_installed = true;

const start = async () => {
	console.log('[VK Next Team] Classic VK Feed started');
};

start().catch(console.error);
