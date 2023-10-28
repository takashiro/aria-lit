import { customElement } from 'lit/decorators.js';

import Button, { type ButtonProps } from './Button';

type PressedState = boolean | 'mixed';

export interface ChangeEventInit {
	/**
	 * Whether the button is pressed.
	 */
	pressed: PressedState;
}

export type ChangeEvent = CustomEvent<ChangeEventInit>;

export type ChangeEventHandler = (e: ChangeEvent) => void;

export interface ToggleButtonProps extends ButtonProps {
	/**
	 * Whether the button is pressed.
	 */
	pressed?: PressedState;
}

/**
 * [Toggle Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 *
 * A two-state button that can be either off (not pressed) or on (pressed).
 */
@customElement('cindi-togglebutton')
export class ToggleButton extends Button implements ToggleButtonProps {
	pressed?: PressedState;

	toggle(): void {
		if (this.disabled) {
			return;
		}

		this.pressed = !this.pressed;
		this.ariaPressed = String(this.pressed);
		this.dispatchEvent(new CustomEvent<ChangeEventInit>('change', {
			detail: {
				pressed: this.pressed,
			},
			bubbles: true,
			composed: true,
		}));
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('trigger', this.#handleTrigger);
	}

	override disconnectedCallback(): void {
		this.removeEventListener('trigger', this.#handleTrigger);
		super.disconnectedCallback();
	}

	#handleTrigger = (): void => {
		this.toggle();
	};
}

export default ToggleButton;

declare global {
	interface HTMLElementTagNameMap {
		'cindi-togglebutton': ToggleButton;
	}
}
