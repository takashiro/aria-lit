import { customElement } from 'lit/decorators.js';

export interface TooltipProps {
	/**
	 * The element with a tooltip.
	 * If it is focused or hovered, the tooltip will be displayed.
	 * (Default: previous element of the tooltip)
	 */
	trigger?: Element;
}

/**
 * [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
 *
 * A tooltip is a popup that displays information related to an element
 * when the element receives keyboard focus or the mouse hovers over it.
 * It typically appears after a small delay and disappears when Escape
 * is pressed or on mouse out.
 *
 * Tooltip widgets do not receive focus. A hover that contains
 * focusable elements can be made using a non-modal dialog.
 */
@customElement('karuta-tooltip')
export default class Tooltip extends HTMLElement implements TooltipProps {
	trigger?: HTMLElement;

	connectedCallback(): void {
		if (!this.role) {
			this.role = 'tooltip';
		}

		const trigger = this.#getTrigger();
		if (trigger) {
			this.#addEventListeners(trigger);
		}
	}

	disconnectedCallback(): void {
		const trigger = this.#getTrigger();
		if (trigger) {
			this.#removeEventListeners(trigger);
		}
	}

	#addEventListeners(trigger: HTMLElement): void {
		trigger.addEventListener('mouseenter', this.#show);
		trigger.addEventListener('mouseleave', this.#hide);
		trigger.addEventListener('focus', this.#show);
		trigger.addEventListener('blur', this.#hide);
		trigger.addEventListener('keydown', this.#handleKeyDown);
	}

	#removeEventListeners(trigger: HTMLElement): void {
		trigger.removeEventListener('mouseenter', this.#show);
		trigger.removeEventListener('mouseleave', this.#hide);
		trigger.removeEventListener('focus', this.#show);
		trigger.removeEventListener('blur', this.#hide);
		trigger.removeEventListener('keydown', this.#handleKeyDown);
	}

	#getTrigger(): HTMLElement | null {
		return this.trigger ?? this.previousElementSibling as HTMLElement;
	}

	#show = (): void => {
		this.dataset.state = 'open';
	}

	#hide = (): void => {
		delete this.dataset.state;
	}

	#handleKeyDown = (e: KeyboardEvent): void => {
		if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
			return;
		}

		if (e.key === 'Ctrl' || e.key === 'Escape') {
			this.#hide();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'karuta-tooltip': Tooltip;
	}
}
