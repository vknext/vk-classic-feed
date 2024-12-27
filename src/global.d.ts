/* eslint-disable no-var */

interface VKNext {
	cvf_installed?: boolean;
}

interface navGoLoc {
	0?: string;
	section?: string;
	/**
	 * пост в модалке
	 */
	w?: string;
}

interface navGoLocProps extends navGoLoc {
	act?: string;
	z?: string;
}

export interface Nav {
	removeNavigationStartListener: (callback: (locStr: string) => void) => void;
	subscribeOnModuleEvaluated: (callback: () => void, once?: boolean) => void;
	unsubscribeOnModuleEvaluated: (callback: () => void) => void;
	strLoc: string;
	toStr(string: navGoLocProps): string;
	fromStr(string: string): navGoLocProps;
	objLoc: navGoLocProps;
	setLoc(loc: navGoLocProps): void;
	go(loc: navGoLoc | string, ev?: string | null | Event, opts?: Record<string, any>): void;
	change: (loc: navGoLoc, ev?: string | null, opts?: Record<string, any>) => void;
	onLocationChange: (handler: (locStr: string) => unknown) => () => void;
	addNavigationStartListener: (handler: (locStr: string) => unknown) => () => void;
}

export interface Cur {
	module: string;
}

export interface VK {
	pe: Record<string, any>;
}

declare global {
	var browser: typeof globalThis.chrome;

	var vknext: VKNext;
	var nav: Nav;
	var cur: Cur;
	var ge: (id: string) => HTMLElement;
	var data: (elem: HTMLElement, prop: string, value: string) => void;
	var addEvent: (elem: HTMLElement, event: string, handler: EventListenerOrEventListenerObject) => void;
	var removeEvent: (elem: HTMLElement, event: string) => void;
	var Video: Record<string, any>;
	var vk: VK;

	var getLang: (key: string, type?: string | number) => string;
	var langDate: (timestamp: number, text: string, mode?: string | number, months?: string | string[]) => string;
	var langNumeric: (n: number, s: string | string[]) => string;

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
		}
	}
}

export interface ObservedHTMLElement extends HTMLElement {
	_cvf_mbs?: MutationObserver;
	_cvf_ibs?: IntersectionObserver;
}
