import React from 'react';

import type BasicProps from './BasicProps';
import findElements from '../dom/findElements';

const interactives: string[] = ['button', 'a[href]', 'input', 'textarea', '[tabindex]'];
const defaultPattern = interactives.map((selector) => `${selector}:not([tabindex="-1"])`).join(', ');

const moveFocus = (
	elements: HTMLElement[],
	current: unknown,
	shiftKey: boolean,
): HTMLElement | undefined => {
	if (shiftKey) {
		if (current === elements[0]) {
			return elements[elements.length - 1];
		}
	} else if (current === elements[elements.length - 1]) {
		return elements[0];
	}
};

interface FocusTrapProps<T> extends BasicProps, React.HTMLAttributes<T> {
	/**
	 * A CSS selector to find all interactive elements inside.
	 *
	 * By default, it looks for all built-in elements and those with proper `tabindex`.
	 */
	pattern?: string;

	/**
	 * This is called when `Esc` key is pressed.
	 * The callback should move focus to the trigger element.
	 *
	 * @param e keyboard event.
	 */
	onEscape?(e: React.KeyboardEvent<T>): void;
}

/**
 * This creates an area to trap focus inside.
 *
 * The focus goes from the last interactive element to the first if it reaches the end.
 * It also goes from the first to the last vice versa.
 */
export default function FocusTrap<T extends HTMLElement = HTMLDivElement>({
	component: Component = 'div',
	pattern = defaultPattern,
	onEscape,
	children,
	onKeyDown,
	...otherProps
}: FocusTrapProps<T>): JSX.Element {
	const me = React.useRef<T>(null);

	const handleKeyDown = (e: React.KeyboardEvent<T>) => {
		if (!e.ctrlKey && !e.altKey && !e.metaKey) {
			if (e.key === 'Tab') {
				const elements = findElements(e.currentTarget, pattern);
				const next = moveFocus(elements, e.target, e.shiftKey);
				if (next) {
					e.preventDefault();
					setTimeout(() => next.focus(), 0);
				}
			} else if (e.key === 'Escape') {
				onEscape?.(e);
			}
		}
		onKeyDown?.(e);
	};

	React.useEffect(() => {
		const container = me.current as HTMLElement;
		const [first] = findElements(container, pattern);
		first?.focus();
	}, []);

	return (
		<Component ref={me} onKeyDown={handleKeyDown} {...otherProps}>
			{children}
		</Component>
	);
}
