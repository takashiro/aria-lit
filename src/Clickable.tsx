import React from 'react';

import type BasicProps from './common/BasicProps';

export type TriggerEvent<T> = React.MouseEvent<T> | React.KeyboardEvent<T>;

export interface ClickableProps<T> extends BasicProps, React.HTMLAttributes<T> {
	/**
	 * ARIA role, usually `button`, `radio`, `checkbox`, `menuitem`, etc.
	 */
	role: string;

	/**
	 * An event handler to be called when the element is clicked or triggered by keyboard.
	 * @param e mouse or keyboard event.
	 */
	onTrigger(e: TriggerEvent<T>): void;

	/**
	 * Whether the button is disabled.
	 */
	disabled?: boolean;

	/**
	 * Keys to trigger the element. (Default: Space or Enter).
	 */
	keys?: string[];
}

export type GenericClickableProps<T> = Omit<ClickableProps<T>, 'role' | 'keys'>;

/**
 * This is a clickable element.
 *
 * It is used to implement buttons, checkboxes or anything can be clicked.
 */
export default function Clickable<T extends HTMLElement = HTMLDivElement>({
	component: Component = 'div',
	tabIndex = 0,
	onTrigger,
	disabled,
	keys = [' ', 'Enter'],
	onClick,
	onKeyDown,
	children,
	...otherProps
}: ClickableProps<T>): JSX.Element {
	const handleClick = (e: React.MouseEvent<T>): void => {
		onTrigger(e);
		onClick?.(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<T>): void => {
		if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && keys.includes(e.key)) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	};

	return (
		<Component
			tabIndex={disabled ? -1 : tabIndex}
			onClick={disabled ? undefined : handleClick}
			onKeyDown={disabled ? undefined : handleKeyDown}
			{...otherProps}
		>
			{children}
		</Component>
	);
}
