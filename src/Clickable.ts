import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A clickable element, used to implement buttons, checkboxes or anything can be clicked.
 */
@customElement('kart-clickable')
export class Clickable extends LitElement {
	@property() disabled = false;

	static styles = css`
		[role='button'] {
			cursor: pointer;
		}

		div[role='button'][aria-disabled='true'] {
			cursor: not-allowed;
		}
	`;

	override render(): TemplateResult<1> {
		return html`
			<div role=${this.role ?? 'button'} @keydown=${this.#handleKeyDown} aria-disabled=${this.disabled}>
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
