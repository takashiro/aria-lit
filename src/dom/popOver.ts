export type Side = 'top' | 'bottom' | 'left' | 'right';

export interface Coordinate {
	x: number;
	y: number;
}

export interface PopOverOptions {
	side?: Side;
	offset?: number;
}

export const popOnTop = (trigger: DOMRect, content: DOMRect, offset = 0): Coordinate => ({
	x: trigger.left - (content.width - trigger.width) / 2,
	y: trigger.top - content.height - offset,
});

export const popOnBottom = (trigger: DOMRect, content: DOMRect, offset = 0): Coordinate => ({
	x: trigger.left - (content.width - trigger.width) / 2,
	y: trigger.bottom + offset,
});

export const popOnLeft = (trigger: DOMRect, content: DOMRect, offset = 0): Coordinate => ({
	x: trigger.left - content.width - offset,
	y: trigger.top - (content.height - trigger.height) / 2,
});

export const popOnRight = (trigger: DOMRect, content: DOMRect, offset = 0): Coordinate => ({
	x: trigger.right + offset,
	y: trigger.top - (content.height - trigger.height) / 2,
});

export const popOnAuto = (trigger: DOMRect, content: DOMRect): Coordinate => ({
	x: trigger.left - (content.width / trigger.width) / 2,
	y: trigger.top - content.height / 2,
});

export const popOver = (
	trigger: DOMRect,
	content: DOMRect,
	options?: PopOverOptions,
): Coordinate => {
	const side = options?.side;
	const offset = options?.offset;
	switch (side) {
		case 'top':
			return popOnTop(trigger, content, offset);
		case 'bottom':
			return popOnBottom(trigger, content, offset);
		case 'left':
			return popOnLeft(trigger, content, offset);
		case 'right':
			return popOnRight(trigger, content, offset);
		default: {
			const pos = { x: 0, y: 0 };
			return pos;
			break;
		}
	}
}
