import { jest, expect, it } from '@jest/globals';
import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Clickable from '../src/Clickable';

it('should handle mouse events', async () => {
	const onTrigger = jest.fn();
	render(<Clickable role="button" onTrigger={onTrigger}>Click me!</Clickable>);
	const button = screen.getByRole('button', { name: 'Click me!' });
	await userEvent.click(button);
	expect(onTrigger).toBeCalledTimes(1);
});

it('should handle keyboard events', async () => {
	const toggle = jest.fn();
	const trigger = jest.fn();
	render(
		<>
			<Clickable component="span" role="checkbox" onTrigger={toggle}>
				<div>a</div>
			</Clickable>
			<Clickable component="li" role="menuitem" onTrigger={trigger}>
				<div>b</div>
			</Clickable>
		</>,
	);
	const checkbox = screen.getByRole('checkbox', { name: 'a' });
	expect(checkbox.tagName).toBe('SPAN');

	const menuitem = screen.getByRole('menuitem', { name: 'b' });
	expect(menuitem.tagName).toBe('LI');

	await userEvent.tab();
	expect(checkbox).toBe(document.activeElement);
	expect(menuitem).not.toBe(document.activeElement);

	await userEvent.keyboard('{ }');
	expect(toggle).toBeCalledTimes(1);
	expect(trigger).toBeCalledTimes(0);

	await userEvent.tab();
	await userEvent.keyboard('{enter}');
	expect(toggle).toBeCalledTimes(1);
	expect(trigger).toBeCalledTimes(1);
});

it('does not handle events if disabled', async () => {
	const trigger = jest.fn();
	render(<Clickable role="button" onTrigger={trigger} disabled>Test</Clickable>);
	const button = screen.getByRole('button', { name: 'Test' });

	await userEvent.tab();
	expect(button).not.toBe(document.activeElement);

	await userEvent.click(button);
	expect(trigger).not.toBeCalled();

	button.focus();
	await userEvent.keyboard('{enter}');
	expect(trigger).not.toBeCalled();
});
