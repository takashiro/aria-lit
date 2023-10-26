import { customElement } from 'lit/decorators.js';

import { Clickable } from './common/Clickable';

/**
 * **Important**: For normal buttons, please use `<button>` instead.
 * This is usually for icon buttons only.
 *
 * [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 * is a widget that enables users to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling an action,
 * or performing a delete operation.
 * A common convention for informing users
 * that a button launches a dialog is
 * to append "…" (ellipsis) to the button label, e.g., "Save as…".
 */
@customElement('cindi-button')
export class Button extends Clickable {
	role = 'button';
}

export { type ClickableProps as ButtonProps } from './common/Clickable';

export default Button;

declare global {
	interface HTMLElementTagNameMap {
		'cindi-button': Button;
	}
}
