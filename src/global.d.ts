/* eslint-disable no-var */

interface VKNext {
	vcf_installed?: boolean;
	webpack?: Record<string, any>;
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
	id: number;
	pe: Record<string, any>;
}

export interface Feed {
	init: (state: unknown) => unknown;
}

export interface WallInitProps {
	wall_oid?: number;
	public_link?: string;
	loc?: string;
	owner?: {
		id: number;
		name: string;
		photo: string;
	};
	wall_tpl: {
		profileData: [profileId: number, photo: string, href: string, name: string];
		ownerData: [ownerId: number, photo: string, href: string, name: string];
	};
	only_official?: boolean;
}

export interface Wall {
	init: (props: WallInitProps) => void;
	votingUpdateFull: (_: string, e: string) => void;
	initReplyEditable: (replyBox: HTMLElement, replyField: HTMLElement, postId: string) => void;
	showEditReply: (
		postId: string,
		e?: unknown,
		o?: boolean,
		i?: boolean,
		focus?: boolean,
		onInited?: () => void
	) => void;
	_cvf_hooked?: boolean;
}

export interface stManager {
	add(statics: string | string[]): Promise<void>;
}

export interface Notifier {
	showEvent: (props: { title?: string; text?: string }) => void;
}

declare global {
	var browser: typeof globalThis.chrome;

	var Feed: Feed;

	var vknext: VKNext;
	var nav: Nav;
	var cur: Cur;
	var ge: (id: string) => HTMLElement;
	var data: (elem: HTMLElement, prop: string, value: string) => void;
	var addEvent: (elem: HTMLElement, event: string, handler: EventListenerOrEventListenerObject) => void;
	var removeEvent: (elem: HTMLElement, event: string) => void;
	var Video: Record<string, any>;
	var vk: VK;
	var Wall: Wall;
	var templates: Record<string, string>;
	var stManager: stManager;
	var jsc: (module: string) => string;
	var Notifier: Notifier;

	var getLang: null | ((key: string, type?: string | number) => string);
	var langDate: (timestamp: number, text: string, mode?: string | number, months?: string | string[]) => string;
	var langNumeric: (n: number, s: string | string[]) => string;

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
		}
	}
}

export interface ObservedHTMLElement extends HTMLElement {
	_vcf_mbs?: MutationObserver;
	_vcf_ibs?: IntersectionObserver;
}
