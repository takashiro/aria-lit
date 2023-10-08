import React from 'react';

import Clickable, { type GenericClickableProps } from './Clickable';
import useChecked from './hooks/useChecked';

export interface ChangeEvent<T> extends React.ChangeEvent<T> {
	/**
	 * Whether the switch is on.
	 */
	checked: boolean;
}

interface SwitchProps<T> extends Omit<GenericClickableProps<T>, 'onTrigger' | 'defaultChecked' | 'checked'> {
	/**
	 * Whether the switch is on.
	 *
	 * This creates a controlled component.
	 */
	checked?: boolean;

	/**
	 * Whether the switch is on by default.
	 *
	 * If `checked` is not defined, it creates an uncontrolled component.
	 */
	defaultChecked?: boolean;

	/**
	 * This is fired when the switch is toggled.
	 * @param e change event
	 */
	onChange(e: ChangeEvent<T>): void;
}

/**
 * [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * A switch is an input widget that allows users to choose one of two values: on or off.
 */
export default function Switch<T extends HTMLElement = HTMLDivElement>({
	defaultChecked,
	checked,
	onChange,
	...otherProps
}: SwitchProps<T>): JSX.Element {
	const [value, toggle] = useChecked({ defaultChecked, checked, onChange });

	return (
		<Clickable<T>
			role="switch"
			onTrigger={toggle}
			aria-checked={value}
			{...otherProps}
		/>
	);
}
