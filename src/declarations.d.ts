declare module '*.module.scss' {
	const styles: { [className: string]: string };
	export = styles;
}

declare module '*.scss';

declare module '*.svg' {
	const text: string;
	export default text;
}
