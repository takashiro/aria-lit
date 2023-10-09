import React from 'react';

import Clickable, { type GenericClickableProps } from './common/Clickable';
import useChecked from './hooks/useChecked';

type CheckedState = React.AriaAttributes['aria-checked'];

export interface ChangeEvent<T> extends React.ChangeEvent<T> {
	/**
	 * Whether the checkbox is checked.
	 */
	checked: CheckedState;
}

interface CheckboxProps<T> extends Omit<GenericClickableProps<T>, 'onTrigger' | 'defaultChecked' | 'checked'> {
	/**
	 * Checked state.
	 *
	 * This creates a controlled component.
	 */
	checked?: CheckedState;

	/**
	 * Default checked state.
	 *
	 * If `checked` is not defined, it creates an uncontrolled component.
	 */
	defaultChecked?: CheckedState;

	/**
	 * This is fired when the checkbox is toggled.
	 * @param e change event
	 */
	onChange(e: ChangeEvent<T>): void;
}

/**
 * [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
 *
 * A checkable input that has three possible values: true, false, or mixed.
 */
export default function Checkbox<T extends HTMLElement = HTMLDivElement>({
	defaultChecked,
	checked,
	onChange,
	...otherProps
}: CheckboxProps<T>): JSX.Element {
	const [value, toggle] = useChecked({ defaultChecked, checked, onChange });
	return (
		<Clickable<T>
			role="checkbox"
			onTrigger={toggle}
			aria-checked={value}
			keys={[' ']}
			{...otherProps}
		/>
	);
}
