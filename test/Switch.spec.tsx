import {
	jest,
	describe,
	expect,
	it,
	beforeAll,
	afterAll,
	afterEach,
} from '@jest/globals';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import Switch, { ChangeEvent } from '../src/Switch';

describe('Switch (Uncontrolled)', () => {
	const onChange = jest.fn<(e: ChangeEvent<HTMLDivElement>) => void>();

	beforeAll(() => {
		render(<Switch onChange={onChange}>Click me!</Switch>);
	});

	afterAll(() => {
		cleanup();
	});

	afterEach(() => {
		onChange.mockClear();
	});

	it('can be triggered by mouse event', async () => {
		await userEvent.click(screen.getByRole('switch', { name: 'Click me!', checked: false }));
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.checked).toBe(true);
		const swt = screen.getByRole('switch', { name: 'Click me!', checked: true });
		expect(document.activeElement).toBe(swt);
		onChange.mockClear();
	});

	it('can be triggered by space key', async () => {
		await userEvent.keyboard('{ }');
		expect(onChange).toBeCalledTimes(1);
		const [e] = onChange.mock.calls[0];
		expect(e.checked).toBe(false);
		onChange.mockClear();
	});

	it('can be triggered by enter key', async () => {
		await userEvent.keyboard('{Enter}');
		expect(onChange).toBeCalledTimes(1);
		const [e] = onChange.mock.calls[0];
		expect(e.checked).toBe(true);
		onChange.mockClear();
	});
});

describe('Switch (Controlled)', () => {
	const onChange = jest.fn<(e: ChangeEvent<HTMLDivElement>) => void>();

	beforeAll(() => {
		render(<Switch checked onChange={onChange}>Click me!</Switch>);
	});

	afterAll(() => {
		cleanup();
	});

	it('can be triggered by mouse event', async () => {
		await userEvent.click(screen.getByRole('switch', { name: 'Click me!', checked: true }));
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.checked).toBe(false);
		const swt = screen.getByRole('switch', { name: 'Click me!', checked: true });
		expect(document.activeElement).toBe(swt);
		onChange.mockClear();
	});
});
