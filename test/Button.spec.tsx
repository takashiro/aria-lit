import { jest, expect, it } from '@jest/globals';
import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../src/Button';

it('should handle mouse events', async () => {
	const onTrigger = jest.fn();
	render(<Button onTrigger={onTrigger}>Click me!</Button>);
	const button = screen.getByRole('button', { name: 'Click me!' });
	await userEvent.click(button);
	expect(onTrigger).toBeCalledTimes(1);
});

it('should handle keyboard events', async () => {
	const toggle = jest.fn();
	const trigger = jest.fn();
	render(
		<>
			<Button component="span" role="checkbox" onTrigger={toggle}>
				<div>a</div>
			</Button>
			<Button component="li" role="menuitem" onTrigger={trigger}>
				<div>b</div>
			</Button>
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
