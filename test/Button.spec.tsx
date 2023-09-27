import {
	jest,
	describe,
	expect,
	it,
} from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../src/Button';

describe('Button', () => {
	it('can be triggered by mouse event', async () => {
		const onTrigger = jest.fn();
		render(<Button onTrigger={onTrigger}>Click me!</Button>);
		const button = screen.getByRole('button', { name: 'Click me!' });
		await userEvent.click(button);
		expect(onTrigger).toBeCalledTimes(1);
	});

	it('can be triggered by keyboard event', async () => {
		const onTrigger = jest.fn();
		render(<Button component="li" onTrigger={onTrigger}>Click me!</Button>);
		const button = screen.getByRole('button', { name: 'Click me!' });
		button.focus();
		await userEvent.keyboard('{ }');
		await userEvent.keyboard('{Enter}');
		expect(onTrigger).toBeCalledTimes(2);
	});
});
