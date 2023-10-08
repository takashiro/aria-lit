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
import '@testing-library/jest-dom/jest-globals';

import ToggleButton, { ChangeEvent } from '../src/ToggleButton';

describe('Toggle Button (uncontrolled)', () => {
	const onChange = jest.fn<(e: ChangeEvent<HTMLDivElement>) => void>();

	beforeAll(() => {
		render(<ToggleButton onChange={onChange}>Bold</ToggleButton>);
	});

	afterAll(() => {
		cleanup();
	});

	afterEach(() => {
		onChange.mockClear();
	});

	it('can be triggered by mouse event', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Bold', pressed: false }));
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.pressed).toBe(true);
		const button = screen.getByRole('button', { name: 'Bold', pressed: true });
		expect(document.activeElement).toBe(button);
	});

	it('can be triggered by space key', async () => {
		await userEvent.keyboard('{ }');
		expect(onChange).toBeCalledTimes(1);
		const [e] = onChange.mock.calls[0];
		expect(e.pressed).toBe(false);
	});

	it('can be triggered by enter key', async () => {
		await userEvent.keyboard('{Enter}');
		expect(onChange).toBeCalledTimes(1);
		const [e] = onChange.mock.calls[0];
		expect(e.pressed).toBe(true);
	});
});

describe('Other Toogle Buttons', () => {
	const onChange = jest.fn<(e: ChangeEvent<HTMLDivElement>) => void>();

	afterEach(() => {
		onChange.mockClear();
	});

	it('can be triggered by mouse event', async () => {
		render(<ToggleButton pressed onChange={onChange}>Italic</ToggleButton>);
		await userEvent.click(screen.getByRole('button', { name: 'Italic', pressed: true }));
		expect(onChange).toBeCalledTimes(1);
		const e = onChange.mock.calls[0][0];
		expect(e.pressed).toBe(false);
		const button = screen.getByRole('button', { name: 'Italic', pressed: true });
		expect(document.activeElement).toBe(button);
		cleanup();
	});

	it('can be pressed by default', async () => {
		render(<ToggleButton defaultPressed onChange={onChange}>Italic</ToggleButton>);
		const button = screen.getByRole('button', { name: 'Italic', pressed: true });
		expect(button).toBeVisible();
	});
});
