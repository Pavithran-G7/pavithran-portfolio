/// <reference types="vite/client" />

type GsapTween = {
	kill?: () => void;
};

type GsapTimeline = {
	to: (...args: unknown[]) => GsapTimeline;
	call: (...args: unknown[]) => GsapTimeline;
};

declare const THREE: {
	[key: string]: unknown;
};

declare const gsap: {
	timeline: (...args: unknown[]) => GsapTimeline;
	to: (...args: unknown[]) => GsapTween;
	from: (...args: unknown[]) => GsapTween;
	fromTo: (...args: unknown[]) => GsapTween;
	set: (...args: unknown[]) => void;
	registerPlugin: (...plugins: unknown[]) => void;
};

declare const ScrollTrigger: {
	create: (...args: unknown[]) => unknown;
	getAll: () => Array<{ kill: () => void }>;
	update?: () => void;
};

declare const ScrollToPlugin: {
	[key: string]: unknown;
};

declare const TextPlugin: {
	[key: string]: unknown;
};

declare const Splitting: (...args: unknown[]) => unknown;
