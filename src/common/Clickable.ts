import { LitElement, TemplateResult, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface ClickableProps {
	/**
	 * Whether the clickable element is disabled.
	 */
	disabled?: boolean;
}

/**
 * A clickable element, used to implement buttons, checkboxes or anything can be clicked.
 */
export class Clickable extends LitElement implements ClickableProps {
	@property({ type: Boolean }) disabled?: boolean;

	static styles = css`
		.clickable {
			cursor: pointer;
		}

		.clickable[aria-disabled='true'] {
			cursor: not-allowed;
		}
	`;

	override render(): TemplateResult<1> {
		const tabIndex = this.disabled ? -1 : 0;
		return html`
			<div class="clickable" role=${ifDefined(this.role)} tabindex=${tabIndex} @click=${this.#handleClick} @keydown=${this.#handleKeyDown} aria-disabled=${ifDefined(this.disabled)}>
				<slot></slot>
			</div>
		`;
	}

	#handleClick(e: MouseEvent): void {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	#handleKeyDown(e: KeyboardEvent): void {
		if (this.disabled || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
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
