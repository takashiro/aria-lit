import {
	LitElement,
	type TemplateResult,
	html,
	nothing,
} from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './Button.js';
import createId from './dom/createId.js';

export interface ToggleEventInit {
	/**
	 * Whether the disclosure is expanded.
	 */
	expanded: boolean;
}

export type ToggleEvent = CustomEvent<ToggleEventInit>;

export type ToggleEventHandler = (e: ToggleEvent) => void;

export interface DisclosureProps {
	/**
	 * CSS selector to find the trigger button.
	 * If not defined, it finds the first element of `Button`.
	 */
	trigger?: string;

	/**
	 * Whether the disclosure is expanded. (Default: `false`)
	 */
	expanded: boolean;
}

/**
 * [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 *
 * A disclosure is a widget that enables content to be either collapsed (hidden)
 * or expanded (visible). It has two elements: a disclosure button and a section
 * of content whose visibility is controlled by the button. When the controlled
 * content is hidden, the button is often styled as a typical push button with
 * a right-pointing arrow or triangle to hint that activating the button will
 * display additional content. When the content is visible, the arrow or triangle
 * typically points down.
 */
@customElement('cindi-disclosure')
export class Disclosure extends LitElement implements DisclosureProps {
	trigger?: string;

	@state() expanded = false;

	contentId = createId();

	#handleTrigger = (): void => {
		this.expanded = !this.expanded;
		this.dispatchEvent(new CustomEvent<ToggleEventInit>('change', {
			detail: {
				expanded: this.expanded,
			},
			bubbles: true,
			composed: true,
		}));
	};

	render(): TemplateResult<1> {
		return html`
			<cindi-button @trigger=${this.#handleTrigger} aria-expanded=${this.expanded} aria-controls=${this.contentId}>
				<slot name="trigger"></slot>
			</cindi-button>
			<div id=${this.contentId} class=${(this.expanded ? 'expanded' : 'collapsed')}>
				${this.expanded ? html`<slot></slot>` : nothing}
			</div>
		`;
	}
}

export default Disclosure;

declare global {
	interface HTMLElementTagNameMap {
		'cindi-disclosure': Disclosure;
	}
}
