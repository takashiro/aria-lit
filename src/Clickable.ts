import { LitElement, TemplateResult, css, html } from 'lit';
import { property } from 'lit/decorators.js';

export interface ClickableProps {
	/**
	 * Whether the clickable element is disabled.
	 */
	disabled: boolean;
}

/**
 * A clickable element, used to implement buttons, checkboxes or anything can be clicked.
 */
export class Clickable extends LitElement implements ClickableProps {
	@property({ type: Boolean }) disabled = false;

	static styles = css`
		[role='button'] {
			cursor: pointer;
		}

		[role='button'][aria-disabled='true'] {
			cursor: not-allowed;
		}
	`;

	override render(): TemplateResult<1> {
		const tabIndex = this.disabled ? -1 : 0;
		return html`
			<div role=${this.role ?? 'button'} tabindex=${tabIndex} @click=${this.#handleClick} @keydown=${this.#handleKeyDown} aria-disabled=${this.disabled}>
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
