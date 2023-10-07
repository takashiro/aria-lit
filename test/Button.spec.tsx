import {
	jest,
	describe,
	expect,
	it,
	afterEach,
} from '@jest/globals';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import Button from '../src/Button';

describe('Button', () => {
	afterEach(() => {
		cleanup();
	});

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
