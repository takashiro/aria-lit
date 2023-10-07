import React from 'react';

import type BasicProps from './common/BasicProps';
import Clickable, { type ClickableProps } from './Clickable';
import FocusList from './FocusList';

interface RadioProps<V, T> extends Omit<ClickableProps<T>, 'role' | 'onTrigger'> {
	/**
	 * Value of the radio element.
	 */
	// eslint-disable-next-line react/no-unused-prop-types
	value: V;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Radio<V, T extends HTMLElement = HTMLDivElement>(props: RadioProps<V, T>): null {
	return null;
}

export interface ChangeEvent<V, T extends HTMLElement = HTMLDivElement>
	extends React.ChangeEvent<T> {
	/**
	 * Value of the currently selected radio.
	 */
	selected?: V;
}

export type ChangeEventHandler<V, T extends HTMLElement = HTMLDivElement>
	= (e: ChangeEvent<V, T>) => void;

interface RadioGroupProps<V, T extends HTMLElement> extends BasicProps, React.HTMLAttributes<T> {
	/**
	* Value of the selected radio.
	*
	* This creates a controlled component.
	*/
	selected?: V;

	/**
	 * Value of the default selected radio.
	 *
	 * If `selected` is not defined, it creates an uncontrolled component.
	 */
	defaultSelected?: V;

	/**
	 * This is fired when the selected radio is changed.
	 * @param e change event
	 */
	onChange?(e: ChangeEvent<V, T>): void;

	/**
	 * Radio elements.
	 */
	children: React.ReactElement<RadioProps<V, T>> | React.ReactElement<RadioProps<V, T>>[];
}

/**
 * [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
 *
 * A radio group is a set of checkable buttons, known as radio buttons,
 * where no more than one of the buttons can be checked at a time.
 */
export default function RadioGroup<V, T extends HTMLElement = HTMLDivElement>({
	role = 'radiogroup',
	children,
	defaultSelected,
	selected: controlledValue,
	onChange,
	...otherProps
}: RadioGroupProps<V, T>): JSX.Element {
	const [uncontrolledValue, setSelected] = React.useState(defaultSelected);
	const selectedValue = controlledValue ?? uncontrolledValue;

	const change = (e: React.SyntheticEvent<T>, newValue: V): void => {
		if (selectedValue === newValue) {
			return;
		}

		setSelected(newValue);
		onChange?.({
			...e,
			target: e.currentTarget,
			selected: newValue,
		});
	};

	return (
		<FocusList<T> role={role} selector={'[role="radio"]'} {...otherProps}>
			{React.Children.map(children, ({ props }) => {
				const { value, children, ...otherRadioProps } = props;
				const checked = props.value === selectedValue;
				return (
					<Clickable
						role="radio"
						tabIndex={checked ? 0 : -1}
						onTrigger={() => setSelected(value)}
						onFocus={(e: React.SyntheticEvent<T>) => change(e, value)}
						aria-checked={checked}
						{...otherRadioProps}
					>
						{children}
					</Clickable>
				);
			})}
		</FocusList>
	);
}
