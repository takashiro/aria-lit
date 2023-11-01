import { customElement } from 'lit/decorators.js';

import CheckboxLike from './common/CheckboxLike.js';

/**
 * [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * A switch is an input widget that allows users to choose one of two values: on or off.
 */
@customElement('cindi-switch')
export class Switch extends CheckboxLike {
	role = 'switch';
}

export default Switch;

export type {
	CheckboxLikeProps as SwitchProps,
	ChangeEvent,
	ChangeEventHandler,
} from './common/CheckboxLike.js';

declare global {
	interface HTMLElementTagNameMap {
		'cindi-switch': Switch;
	}
}
