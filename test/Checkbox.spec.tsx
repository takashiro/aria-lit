import {
	jest,
	describe,
	expect,
	it,
	beforeAll,
	afterAll,
} from '@jest/globals';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import Checkbox, { ChangeEvent } from '../src/Checkbox';

describe('Checkbox (Uncontrolled)', () => {
	const onChange = jest.fn<(e: ChangeEvent<HTMLDivElement>) => void>();

	beforeAll(() => {
		render(<Checkbox onChange={onChange}>Click me!</Checkbox>);
	});

	afterAll(() => {
		cleanup();
	});

	it('can be triggered by mouse event', async () => {
		await userEvent.click(screen.getByRole('checkbox', { name: 'Click me!', checked: false }));
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.checked).toBe(true);
		const checkbox = screen.getByRole('checkbox', { name: 'Click me!', checked: true });
		expect(document.activeElement).toBe(checkbox);
		onChange.mockClear();
	});

	it('can be triggered by space key', async () => {
		await userEvent.keyboard('{ }');
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.checked).toBe(false);
		onChange.mockClear();
	});

	it('cannot be triggered by enter key', async () => {
		await userEvent.keyboard('{Enter}');
		expect(onChange).not.toBeCalled();
	});
});

describe('Checkbox (Controlled)', () => {
	const onChange = jest.fn<(e: ChangeEvent<HTMLDivElement>) => void>();

	beforeAll(() => {
		render(<Checkbox checked onChange={onChange}>Click me!</Checkbox>);
	});

	afterAll(() => {
		cleanup();
	});

	it('can be triggered by mouse event', async () => {
		await userEvent.click(screen.getByRole('checkbox', { name: 'Click me!', checked: true }));
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.checked).toBe(false);
		const checkbox = screen.getByRole('checkbox', { name: 'Click me!', checked: true });
		expect(document.activeElement).toBe(checkbox);
		onChange.mockClear();
	});
});
