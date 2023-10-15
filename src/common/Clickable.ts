export interface ClickableProps {
	/**
	 * Whether the clickable element is disabled.
	 */
	disabled?: boolean;
}

/**
 * A clickable element, used to implement buttons, checkboxes or anything can be clicked.
 */
export class Clickable extends HTMLElement implements ClickableProps {
	disabled?: boolean;

	connectedCallback(): void {
		this.#init();
		this.addEventListener('click', this.#handleClick);
		this.addEventListener('keydown', this.#handleKeyDown);
	}

	disconnectedCallback(): void {
		this.removeEventListener('keydown', this.#handleKeyDown);
		this.addEventListener('click', this.#handleClick);
	}

	#init() {
		if (this.disabled) {
			this.ariaDisabled = 'true';
		} else if (!this.getAttribute('tabindex')) {
			this.tabIndex = 0;
		}
	}

	#handleClick = (): void => {
		if (this.disabled) {
			return;
		}

		this.#trigger();
	}

	#handleKeyDown = (e: KeyboardEvent): void => {
		if (this.disabled || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
			return;
		}

		if ([' ', 'Enter'].includes(e.key)) {
			this.#trigger();
		}
	}

	#trigger(): void {
		this.dispatchEvent(new MouseEvent('trigger', {
			bubbles: true,
			composed: true,
		}));
	}
}
