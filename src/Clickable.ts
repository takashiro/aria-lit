import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * A clickable element, used to implement buttons, checkboxes or anything can be clicked.
 */
@customElement('kart-clickable')
export class Clickable extends LitElement {
	override render(): TemplateResult<1> {
		return html`
			<div role=${this.role ?? 'button'} @keydown=${this.#handleKeyDown}>
				<slot></slot>
			</div>
		`;
	}

	#handleKeyDown(e: KeyboardEvent): void {
		if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
			return;
		}

		if ([' ', 'Enter'].includes(e.key)) {
			this.dispatchEvent(new MouseEvent('click', {
				bubbles: true,
				composed: true,
			}));
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'kart-clickable': Clickable;
	}
}
