import { customElement } from 'lit/decorators.js';

import FocusList from './common/FocusList';
import { Radio } from './Radio';

export interface ChangeEventInit<T> {
	/**
	 * Value of the currently selected radio.
	 */
	selected?: T;
}

export type ChangeEvent<T> = CustomEvent<ChangeEventInit<T>>;

export type ChangeEventHandler<T> = (e: ChangeEvent<T>) => void;

export interface RadioGroupProps<T> {
	/**
	* Value of the selected radio.
	*
	* This creates a controlled component.
	*/
	selected?: T;
}

/**
 * [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
 *
 * A radio group is a set of checkable buttons, known as radio buttons,
 * where no more than one of the buttons can be checked at a time.
 */
@customElement('cindi-radiogroup')
export class RadioGroup<T> extends FocusList implements RadioGroupProps<T> {
	role = 'radiogroup';

	selector = '[role="radio"]';

	selected?: T;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('trigger', this.#handleChange);
		this.addEventListener('focusin', this.#handleFocusIn);
		this.#updateRadios();
	}

	override disconnectedCallback(): void {
		this.removeEventListener('focusin', this.#handleFocusIn);
		this.removeEventListener('trigger', this.#handleChange);
		super.disconnectedCallback();
	}

	#updateRadios(): void {
		for (const child of this.children) {
			if (child instanceof Radio) {
				const checked = child.value === this.selected;
				child.checked = checked;
				child.tabIndex = checked ? 0 : -1;
			}
		}
	}

	#select(radio: Radio<T>): void {
		this.#setValue(radio.value);
		this.#updateRadios();
	}

	#setValue(value?: T): void {
		if (this.selected === value) {
			return;
		}
		this.selected = value;
		this.dispatchEvent(new CustomEvent<ChangeEventInit<T>>('change', {
			detail: {
				selected: value,
			},
		}));
	}

	#handleChange = (e: Event): void => {
		const { target } = e;
		if (target instanceof Radio) {
			e.preventDefault();
			e.stopPropagation();
			this.#select(target as Radio<T>);
		}
	};

	#handleFocusIn = (e: Event): void => {
		const { target } = e;
		if (target instanceof Radio) {
			e.preventDefault();
			e.stopPropagation();
			this.#select(target as Radio<T>);
		}
	};
}

export default RadioGroup;

export { Radio } from './Radio';

declare global {
	interface HTMLElementTagNameMap {
		'cindi-radiogroup': RadioGroup<unknown>;
	}
}
