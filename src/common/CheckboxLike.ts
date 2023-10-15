import { Clickable, type ClickableProps } from './Clickable';

type CheckedState = boolean | 'mixed';

export interface ChangeEventInit {
	/**
		 * Whether the widget is checked.
		 */
	checked: CheckedState;
}

export type ChangeEvent = CustomEvent<ChangeEventInit>;

export type ChangeEventHandler = (e: ChangeEvent) => void;

export interface CheckboxLikeProps extends ClickableProps {
	/**
	 * Checked state.
	 */
	checked?: CheckedState;
}

export abstract class CheckboxLike extends Clickable implements CheckboxLikeProps {
	checked?: CheckedState;

	keys = [' '];

	toggle(): void {
		this.checked = !this.checked;
		this.ariaChecked = String(this.checked);
		this.dispatchEvent(new CustomEvent<ChangeEventInit>('change', {
			detail: {
				checked: this.checked,
			},
			bubbles: true,
			composed: true,
		}));
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#init();
		this.addEventListener('trigger', this.#handleTrigger);
	}

	override disconnectedCallback(): void {
		this.removeEventListener('trigger', this.#handleTrigger);
		super.disconnectedCallback();
	}

	#init() {
		if (this.checked) {
			this.ariaChecked = String(this.checked);
		}
	}

	#handleTrigger = (): void => {
		this.toggle();
	}
}

export default CheckboxLike;
