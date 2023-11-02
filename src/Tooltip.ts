import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
	Coordinate,
	Side,
	popOver,
} from './dom/popOver.js';

export interface TooltipProps {
	/**
	 * The element with a tooltip.
	 * If it is focused or hovered, the tooltip will be displayed.
	 * (Default: previous element of the tooltip)
	 */
	trigger?: Element;

	/**
	 * Position of the tooltip (relative to its trigger).
	 */
	side?: Side;
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
@customElement('cindi-tooltip')
export default class Tooltip extends LitElement implements TooltipProps {
	trigger?: HTMLElement;

	@property({ type: String }) side?: Side;

	offset = 0;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override connectedCallback(): void {
		const trigger = this.#getTrigger();
		if (trigger) {
			this.#addEventListeners(trigger);
		}
		super.connectedCallback();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		const trigger = this.#getTrigger();
		if (trigger) {
			this.#removeEventListeners(trigger);
		}
	}

	moveTo(pos: Coordinate): void {
		const rect = this.getBoundingClientRect();
		const deltaX = pos.x - rect.left;
		const deltaY = pos.y - rect.top;
		this.style.top = `${deltaY}px`;
		this.style.left = `${deltaX}px`;
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

	#show = (e: Event): void => {
		this.style.position = 'fixed';
		this.dataset.state = 'open';
		this.style.top = '0';
		this.style.left = '0';
		this.style.transform = 'translateX(-200%)';

		const trigger = e.currentTarget as HTMLElement;
		const triggerRect = trigger.getBoundingClientRect();
		const tooltipRect = this.getBoundingClientRect();

		const pos: Coordinate = popOver(triggerRect, tooltipRect, {
			side: this.side,
			offset: this.offset,
		});
		this.role = 'tooltip';
		this.moveTo(pos);
	}

	#hide = (): void => {
		delete this.dataset.state;
		this.role = null;
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
		'cindi-tooltip': Tooltip;
	}
}

export type { Side, Coordinate } from './dom/popOver.js';
