import React from 'react';
import {
	jest,
	describe,
	expect,
	it,
	beforeAll,
	afterAll,
} from '@jest/globals';
import { render, screen, cleanup } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import FocusTrap from '../src/FocusTrap';

describe('Normal Focus Trap', () => {
	const onEscape = jest.fn();

	beforeAll(() => {
		render(
			<FocusTrap onEscape={onEscape}>
				<button type="button">Native Button</button>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a id="anchor">Page Anchor</a>
				<a href="https://www.google.com">Google</a>
				<div>This is a test.</div>
				<input type="text" aria-label="User Name" />
				<textarea aria-label="Note" />
				<div role="checkbox" tabIndex={0} aria-label="Toggle" aria-checked />
			</FocusTrap>,
		);
	});

	afterAll(() => {
		cleanup();
	});

	it('should focus on the first element', () => {
		const button = screen.getByRole('button', { name: 'Native Button' });
		expect(button).toBe(document.activeElement);
		expect(button.matches(':focus')).toBe(true);
	});

	it('should go to link', async () => {
		await userEvent.tab();
		const google = screen.getByRole('link', { name: 'Google' });
		expect(google).toBe(document.activeElement);
	});

	it('should go to input', async () => {
		await userEvent.tab();
		const username = screen.getByRole('textbox', { name: 'User Name' });
		expect(username).toBe(document.activeElement);
	});

	it('should go to textarea', async () => {
		await userEvent.tab();
		const note = screen.getByRole('textbox', { name: 'Note' });
		expect(note).toBe(document.activeElement);
	});

	it('should go to checkbox', async () => {
		await userEvent.tab();
		const checkbox = screen.getByRole('checkbox', { name: 'Toggle' });
		expect(checkbox).toBe(document.activeElement);
	});

	it('should go back to the first element', async () => {
		await userEvent.tab();
		const button = screen.getByRole('button', { name: 'Native Button' });
		expect(button).toBe(document.activeElement);
	});

	it('should go back to the last element', async () => {
		await userEvent.tab({ shift: true });
		const checkbox = screen.getByRole('checkbox', { name: 'Toggle' });
		expect(checkbox).toBe(document.activeElement);
	});

	it('should go back to textarea', async () => {
		await userEvent.tab({ shift: true });
		const note = screen.getByRole('textbox', { name: 'Note' });
		expect(note).toBe(document.activeElement);
	});

	it('should go back to input', async () => {
		await userEvent.tab({ shift: true });
		const username = screen.getByRole('textbox', { name: 'User Name' });
		expect(username).toBe(document.activeElement);
	});

	it('should handle Esc key', async () => {
		await userEvent.keyboard('{escape}');
		expect(onEscape).toBeCalledTimes(1);
	});

	it('should go back to link', async () => {
		await userEvent.tab({ shift: true });
		const google = screen.getByRole('link', { name: 'Google' });
		expect(google).toBe(document.activeElement);
	});

	it('should go back to button', async () => {
		await userEvent.tab({ shift: true });
		const button = screen.getByRole('button', { name: 'Native Button' });
		expect(button).toBe(document.activeElement);
	});
});

describe('Empty Focus Trap', () => {
	it('renders and unmounts', async () => {
		const trap = render(
			<FocusTrap>
				<button type="button">a</button>
			</FocusTrap>,
		);
		trap.unmount();
	});
});
