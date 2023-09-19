import React from 'react';

export type TriggerEvent<T> = React.MouseEvent<T> | React.KeyboardEvent<T>;

export interface ClickableProps<T> extends React.HTMLAttributes<T> {
    component?: React.ElementType;
    onTrigger(e: TriggerEvent<T>): void;
	keys?: string[];
}

export default function Clickable<T extends HTMLElement = HTMLDivElement>({
	component: Component = 'div',
	role = 'button',
	tabIndex = 0,
	onTrigger,
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
			role={role}
			tabIndex={tabIndex}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...otherProps}
		>
			{children}
		</Component>
	);
}
