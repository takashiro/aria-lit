import { useState } from 'react';
import { type TriggerEvent } from '../Clickable';

type CheckedState = React.AriaAttributes['aria-checked'];

type TriggerEventHandler<T> = (e: TriggerEvent<T>) => void;

export interface ChangeEvent<T> extends React.ChangeEvent<T> {
	/**
	 * Whether the checkbox is checked.
	 */
	checked: CheckedState;
}

interface ComponentProps<T> {
	defaultChecked?: CheckedState;
	checked?: CheckedState;
	onChange?(e: ChangeEvent<T>): void;
}

export default function useChecked<T>({
	defaultChecked,
	checked: controlledValue,
	onChange,
}: ComponentProps<T>): [CheckedState, TriggerEventHandler<T>] {
	const [uncontrolledValue, setChecked] = useState(defaultChecked ?? false);
	const checked = controlledValue ?? uncontrolledValue;

	const toggle = (e: TriggerEvent<T>): void => {
		const newValue = !checked;
		setChecked(newValue);
		onChange?.({ ...e, target: e.currentTarget, checked: newValue });
	};

	return [checked, toggle];
}
