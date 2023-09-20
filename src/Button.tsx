import React from 'react';

export type TriggerEvent<T> = React.MouseEvent<T> | React.KeyboardEvent<T>;

export interface ButtonProps<T> extends React.HTMLAttributes<T> {
	/**
	 * The component used to implement this `button` element.
	 */
	component?: React.ElementType;

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

/**
 * This is a [button](https://www.w3.org/WAI/ARIA/apg/patterns/button/).
 *
 * It is used to implement custom buttons with keyboard support.
 */
export default function Button<T extends HTMLElement = HTMLDivElement>({
	component: Component = 'div',
	role = 'button',
	tabIndex = 0,
	onTrigger,
	disabled,
	keys = [' ', 'Enter'],
	onClick,
	onKeyDown,
	children,
	...otherProps
}: ButtonProps<T>): JSX.Element {
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
			role={role}
			tabIndex={disabled ? -1 : tabIndex}
			onClick={disabled ? undefined : handleClick}
			onKeyDown={disabled ? undefined : handleKeyDown}
			{...otherProps}
		>
			{children}
		</Component>
	);
}
