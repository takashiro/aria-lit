import React from 'react';

import Clickable, { type TriggerEvent, type GenericClickableProps } from './common/Clickable';

export interface ToggleEvent<T> extends React.SyntheticEvent<T> {
	/**
	 * Whether the disclosure is expanded.
	 */
	expanded: boolean;
}

export type ToggleEventHandler<T> = (e: ToggleEvent<T>) => void;

type ChildRenderer = (expanded: boolean) => React.ReactNode;

interface DisclosureProps<T> extends Omit<GenericClickableProps<T>, 'onTrigger' | 'children' | 'defaultChecked' | 'checked'> {
	/**
	 * Trigger button text.
	 */
	trigger: React.ReactNode;

	/**
	 * Whether the disclosure should be expanded by default. (Default: `false`)
	 */
	defaultExpanded?: boolean;

	/**
	 * This is executed when the disclosure is toggled.
	 * @param e expand event
	 */
	onToggle?(e: ToggleEvent<T>): void;

	/**
	 * Render the collapsible area.
	 * By default it renders `children` only when the disclosure is expanded.
	 *
	 * @param id Element ID
	 * @param expanded Whether the disclosure is expanded
	 */
	children: React.ReactNode | ChildRenderer;
}

/**
 * [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 *
 * A disclosure is a widget that enables content to be either collapsed (hidden)
 * or expanded (visible). It has two elements: a disclosure button and a section
 * of content whose visibility is controlled by the button. When the controlled
 * content is hidden, the button is often styled as a typical push button with
 * a right-pointing arrow or triangle to hint that activating the button will
 * display additional content. When the content is visible, the arrow or triangle
 * typically points down.
 */
export default function Disclosure<T extends HTMLElement = HTMLDivElement>({
	trigger,
	children,
	defaultExpanded,
	onToggle,
	...otherProps
}: DisclosureProps<T>): JSX.Element {
	const contentId = React.useId();
	const [expanded, setExpanded] = React.useState(defaultExpanded ?? false);

	const handleTrigger = (e: TriggerEvent<T>) => {
		const newValue = !expanded;
		setExpanded(newValue);
		onToggle?.({ ...e, expanded: newValue });
	};

	return (
		<>
			<Clickable<T>
				role="button"
				onTrigger={handleTrigger}
				aria-expanded={expanded}
				aria-controls={contentId}
				{...otherProps}
			>
				{trigger}
			</Clickable>
			<div id={contentId}>
				{typeof children === 'function'
					? children(expanded)
					: (expanded && children)}
			</div>
		</>
	);
}
