import React from 'react';

import Clickable, { type GenericClickableProps } from './common/Clickable';
import useChecked, { type ChangeEvent as CheckedChangeEvent } from './hooks/useChecked';

type PressedState = React.HTMLAttributes<HTMLElement>['aria-pressed'];

export interface ChangeEvent<T> extends React.ChangeEvent<T> {
	/**
	 * Whether the button is pressed.
	 */
	pressed: PressedState;
}

type RemovedProps = 'onTrigger' | 'defaultChecked' | 'checked';

interface ToggleButtonProps<T> extends Omit<GenericClickableProps<T>, RemovedProps> {
	defaultPressed?: PressedState;

	pressed?: PressedState;

	onChange?(e: ChangeEvent<T>): void;
}

/**
 * [Toggle Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 *
 * A two-state button that can be either off (not pressed) or on (pressed).
 */
export default function ToggleButton<T extends HTMLElement = HTMLDivElement>({
	defaultPressed,
	pressed,
	onChange,
	...otherProps
}: ToggleButtonProps<T>): JSX.Element {
	const [value, toggle] = useChecked({
		defaultChecked: defaultPressed,
		checked: pressed,
		onChange: onChange && (({ checked, ...e }: CheckedChangeEvent<T>) => onChange({
			...e,
			pressed: checked,
		})),
	});
	return (
		<Clickable<T>
			role="button"
			onTrigger={toggle}
			aria-pressed={value}
			{...otherProps}
		/>
	);
}
