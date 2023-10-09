import {
	describe,
	it,
	expect,
	beforeAll,
	afterAll,
} from '@jest/globals';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import FocusList from '../../src/common/FocusList';

describe('Normal Focus List', () => {
	let a: HTMLElement;
	let b: HTMLElement;
	let c: HTMLElement;

	beforeAll(() => {
		render(
			<FocusList selector="button">
				<button type="button" tabIndex={-1}>A</button>
				<button type="button" tabIndex={-1}>B</button>
				<button type="button" tabIndex={-1}>C</button>
			</FocusList>,
		);
		a = screen.getByRole('button', { name: 'A' });
		b = screen.getByRole('button', { name: 'B' });
		c = screen.getByRole('button', { name: 'C' });
	});

	afterAll(() => {
		cleanup();
	});

	it('can move focus forward', async () => {
		a.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(document.activeElement).toBe(b);
		await userEvent.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(c);
		await userEvent.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(c);
	});

	it('can move focus backforward', async () => {
		await userEvent.keyboard('{ArrowUp}');
		expect(document.activeElement).toBe(b);
		await userEvent.keyboard('{ArrowLeft}');
		expect(document.activeElement).toBe(a);
		await userEvent.keyboard('{ArrowLeft}');
		expect(document.activeElement).toBe(a);
	});

	it('ignores other keys', async () => {
		await userEvent.keyboard('{Enter}');
		expect(document.activeElement).toBe(a);
	});
});

describe('Circular Focus List', () => {
	let a: HTMLElement;
	let b: HTMLElement;
	let c: HTMLElement;

	beforeAll(() => {
		render(
			<FocusList selector="button" circular>
				<button type="button" tabIndex={-1}>A</button>
				<button type="button" tabIndex={-1}>B</button>
				<button type="button" tabIndex={-1}>C</button>
			</FocusList>,
		);
		a = screen.getByRole('button', { name: 'A' });
		b = screen.getByRole('button', { name: 'B' });
		c = screen.getByRole('button', { name: 'C' });
	});

	afterAll(() => {
		cleanup();
	});

	it('can move focus forward', async () => {
		a.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(document.activeElement).toBe(b);
		await userEvent.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(c);
		await userEvent.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(a);
	});

	it('can move focus backforward', async () => {
		await userEvent.keyboard('{ArrowUp}');
		expect(document.activeElement).toBe(c);
		await userEvent.keyboard('{ArrowLeft}');
		expect(document.activeElement).toBe(b);
		await userEvent.keyboard('{ArrowLeft}');
		expect(document.activeElement).toBe(a);
	});
});

describe('Vertical Focus List', () => {
	let a: HTMLElement;
	let b: HTMLElement;

	beforeAll(() => {
		render(
			<FocusList selector="button" orientation="portrait">
				<button type="button" tabIndex={-1}>A</button>
				<button type="button" tabIndex={-1}>B</button>
			</FocusList>,
		);
		a = screen.getByRole('button', { name: 'A' });
		b = screen.getByRole('button', { name: 'B' });
	});

	afterAll(() => {
		cleanup();
	});

	it('accepts arrow down', async () => {
		a.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(document.activeElement).toBe(a);
		await userEvent.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(b);
	});

	it('accepts arrow up', async () => {
		await userEvent.keyboard('{ArrowLeft}');
		expect(document.activeElement).toBe(b);
		await userEvent.keyboard('{ArrowUp}');
		expect(document.activeElement).toBe(a);
	});
});

describe('Horizontal Focus List', () => {
	let a: HTMLElement;
	let b: HTMLElement;

	beforeAll(() => {
		render(
			<FocusList selector="button" orientation="landscape">
				<button type="button" tabIndex={-1}>A</button>
				<button type="button" tabIndex={-1}>B</button>
			</FocusList>,
		);
		a = screen.getByRole('button', { name: 'A' });
		b = screen.getByRole('button', { name: 'B' });
	});

	afterAll(() => {
		cleanup();
	});

	it('accepts arrow right', async () => {
		a.focus();
		await userEvent.keyboard('{ArrowDown}');
		expect(document.activeElement).toBe(a);
		await userEvent.keyboard('{ArrowRight}');
		expect(document.activeElement).toBe(b);
	});

	it('accepts arrow left', async () => {
		await userEvent.keyboard('{ArrowUp}');
		expect(document.activeElement).toBe(b);
		await userEvent.keyboard('{ArrowLeft}');
		expect(document.activeElement).toBe(a);
	});
});
