import { LitElement } from 'lit';
import findElements from '../dom/findElements';

type Orientation = 'portrait' | 'landscape';

export interface FocusListProps {
	/**
	 * CSS selector to find interactive elements.
	 */
	selector?: string;

	/**
	 * If a specific orientation is defined,
	 *  - `portrait`: Only `ArrowUp` and `ArrowDown` will take effect.
	 *  - `landscape`: Only `ArrowLeft` and `ArrowRight` will take effect.
	 */
	orientation?: Orientation;

	/**
	 * Keys to move focus to the next interactive element. (Default: `ArrowRight` and `ArrowDown`)
	 */
	forwardKeys?: string[];

	/**
	 * Keys to move focus to the previous interactive element. (Default: `ArrowLeft` and `ArrowUp`)
	 */
	backwardKeys?: string[];

	/**
	 * Whether focus should be moved in a circular order. (Default: `false`)
	 */
	circular?: boolean;
}

const calculateOffset = (
	key: string,
	forwardKeys: string[],
	backwardKeys: string[],
): number => {
	if (forwardKeys.includes(key)) {
		return 1;
	}
	if (backwardKeys.includes(key)) {
		return -1;
	}
	return 0;
};

const findNext = (
	elements: HTMLElement[],
	current: unknown,
	offset: number,
	circular?: boolean,
): HTMLElement | undefined => {
	const currentIndex = elements.findIndex(((child) => child === current));
	let nextIndex = currentIndex + offset;
	if (circular) {
		if (nextIndex >= elements.length) {
			nextIndex = 0;
		} else if (nextIndex < 0) {
			nextIndex = elements.length - 1;
		}
	}
	return elements[nextIndex];
};

const getForwardKeys = (orientation?: Orientation): string[] => {
	if (orientation === 'portrait') {
		return ['ArrowDown'];
	}
	if (orientation === 'landscape') {
		return ['ArrowRight'];
	}
	return ['ArrowRight', 'ArrowDown'];
}

const getBackwardKeys = (orientation?: Orientation): string[] => {
	if (orientation === 'portrait') {
		return ['ArrowUp'];
	}
	if (orientation === 'landscape') {
		return ['ArrowLeft'];
	}
	return ['ArrowUp', 'ArrowLeft'];
}

export class FocusList extends LitElement implements FocusListProps {
	selector?: string;

	orientation?: Orientation;

	forwardKeys?: string[];

	backwardKeys?: string[];

	circular?: boolean;

	connectedCallback(): void {
		this.addEventListener('keydown', this.#handleKeyDown);
	}

	disconnectedCallback(): void {
		this.removeEventListener('keydown', this.#handleKeyDown);
	}

	#handleKeyDown = (e: KeyboardEvent): void => {
		if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
			return;
		}

		const {
			forwardKeys = getForwardKeys(this.orientation),
			backwardKeys = getBackwardKeys(this.orientation),
		} = this;

		const offset = calculateOffset(e.key, forwardKeys, backwardKeys);
		if (offset) {
			const interactives = findElements(this, this.selector ?? 'button');
			const next = findNext(interactives, e.target, offset, this.circular);
			if (next) {
				e.preventDefault();
				next.focus();
			}
		}
	}
}
