import { customElement } from 'lit/decorators.js';

import Clickable from './common/Clickable';

export interface RadioProps<T> {
	/**
	 * Whether the radio element is checked.
	 */
	checked?: boolean;

	/**
	 * The form value that this radio stands for.
	 */
	value?: T;
}

@customElement('cindi-radio')
export class Radio<T> extends Clickable implements RadioProps<T> {
	static observedAttributes = ['value'];

	role = 'radio';

	tabIndex = -1;

	value?: T;

	#checked?: boolean;

	get checked(): boolean | undefined {
		return this.#checked;
	}

	set checked(newValue: boolean) {
		this.#checked = newValue;
		this.ariaChecked = String(newValue);
	}
}

export default Radio;

declare global {
	interface HTMLElementTagNameMap {
		'cindi-radio': Radio<unknown>;
	}
}
