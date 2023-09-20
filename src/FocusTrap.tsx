import React from 'react';

const interactives: string[] = ['button', 'a[href]', 'input', 'textarea', '[tabindex]'];
const defaultPattern = interactives.map((selector) => `${selector}:not([tabindex="-1"])`).join(', ');

const findInteractiveElements = (container: HTMLElement, pattern: string): HTMLElement[] => {
	const elements = container.querySelectorAll(pattern);
	return [...elements].filter((e) => e instanceof HTMLElement) as HTMLElement[];
};

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

interface FocusTrapProps<T> extends React.HTMLAttributes<T> {
	/**
	 * The component used to implement this focus trap. (Default: `div`)
	 */
	component?: React.ElementType;

	/**
	 * A CSS selector to find all interactive elements inside.
	 *
	 * By default, it looks for all built-in elements and those with proper `tabindex`.
	 */
	pattern?: string;
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
	children,
	onKeyDown,
	...otherProps
}: FocusTrapProps<T>): JSX.Element {
	const me = React.useRef<T>(null);

	const handleKeyDown = (e: React.KeyboardEvent<T>) => {
		if (e.key === 'Tab' && !e.ctrlKey && !e.altKey && !e.metaKey) {
			const elements = findInteractiveElements(e.currentTarget, pattern);
			const next = moveFocus(elements, e.target, e.shiftKey);
			if (next) {
				e.preventDefault();
				setTimeout(() => next.focus(), 0);
			}
		}
		onKeyDown?.(e);
	};

	React.useEffect(() => {
		const container = me.current as HTMLElement;
		const [first] = findInteractiveElements(container, pattern);
		first?.focus();
	}, []);

	return (
		<Component ref={me} onKeyDown={handleKeyDown} {...otherProps}>
			{children}
		</Component>
	);
}
