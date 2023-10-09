import React from 'react';

import Clickable, { type GenericClickableProps } from './common/Clickable';

/**
 * [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 * is a widget that enables users to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling an action,
 * or performing a delete operation.
 * A common convention for informing users
 * that a button launches a dialog is
 * to append "…" (ellipsis) to the button label, e.g., "Save as…".
 */
export default function Button<T extends HTMLElement = HTMLDivElement>(
	props: GenericClickableProps<T>,
): JSX.Element {
	return <Clickable<T> role="button" {...props} />;
}
