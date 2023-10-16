import findElements from '../dom/findElements';

const interactives: string[] = ['button', 'a[href]', 'input', 'textarea', '[tabindex]'];
const defaultPattern = interactives.map((selector) => `${selector}:not([tabindex="-1"])`).join(', ');

const moveFocus = (
	elements: HTMLElement[],
	current: unknown,
	shiftKey: boolean,
): HTMLElement | undefined => {
	if (shiftKey) {
		if (current === elements[0]) {
			return elements[elements.length - 1];
		}
	} else if (current === elements[elements.length - 1]) {
		return elements[0];
	}
};

export interface FocusTrapProps {
	/**
	 * A CSS selector to find all interactive elements inside.
	 *
	 * By default, it looks for all built-in elements and those with proper `tabindex`.
	 */
	pattern?: string;
}

/**
 * This creates an area to trap focus inside.
 *
 * The focus goes from the last interactive element to the first if it reaches the end.
 * It also goes from the first to the last vice versa.
 */
export class FocusTrap extends HTMLElement implements FocusTrapProps {
	pattern?: string;

	connectedCallback(): void {
		this.addEventListener('keydown', this.#handleKeyDown);
	}

	disconnectedCallback(): void {
		this.removeEventListener('keydown', this.#handleKeyDown);
	}

	#handleKeyDown = (e: KeyboardEvent): void => {
		if (!e.ctrlKey && !e.altKey && !e.metaKey) {
			if (e.key === 'Tab') {
				const elements = findElements(this, this.pattern ?? defaultPattern);
				const next = moveFocus(elements, e.target, e.shiftKey);
				if (next) {
					e.preventDefault();
					e.stopPropagation();
					setTimeout(() => next.focus(), 0);
				}
			} else if (e.key === 'Escape') {
				this.dispatchEvent(new KeyboardEvent('escape', {
					bubbles: true,
					composed: true,
				}));
			}
		}
	}
}

export default FocusTrap;
