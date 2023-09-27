import React from 'react';

import Clickable, { type TriggerEvent, type GenericClickableProps } from './Clickable';

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
	checked: controlledValue,
	defaultChecked,
	onChange,
	...otherProps
}: CheckboxProps<T>): JSX.Element {
	const [uncontrolledValue, setChecked] = React.useState(defaultChecked ?? false);
	const checked = controlledValue ?? uncontrolledValue;

	const handleTrigger = (e: TriggerEvent<T>): void => {
		const newValue = !checked;
		setChecked(newValue);
		onChange?.({ ...e, target: e.currentTarget, checked: newValue });
	};

	return (
		<Clickable<T>
			role="checkbox"
			onTrigger={handleTrigger}
			aria-checked={checked}
			keys={[' ']}
			{...otherProps}
		/>
	);
}
