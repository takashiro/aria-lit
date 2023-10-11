import {
	jest,
	describe,
	beforeAll,
	afterAll,
	expect,
	it,
} from '@jest/globals';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/jest-globals';

import Disclosure, { ToggleEventHandler } from '../src/Disclosure';

describe('Disclosure', () => {
	beforeAll(() => {
		render(
			<Disclosure trigger="Lorum Ipsum">
				<p data-testid="content">Phasellus suscipit tristique lectus non porta.</p>
			</Disclosure>,
		);
	});

	afterAll(() => {
		cleanup();
	});

	it('should be hidden by default', () => {
		const content = screen.queryByTestId('content');
		expect(content).toBeNull();
	});

	it('toggles content', async () => {
		const trigger = screen.getByRole('button', { name: 'Lorum Ipsum', expanded: false });
		await userEvent.click(trigger);
		const content = screen.getByTestId('content');
		expect(content).toHaveTextContent('Phasellus suscipit tristique lectus non porta.');
	});
});

describe('Disclosure (Customized Content)', () => {
	const onToggle = jest.fn<ToggleEventHandler<HTMLDivElement>>();

	beforeAll(() => {
		render(
			<Disclosure trigger="Click Me" defaultExpanded onToggle={onToggle}>
				{(expanded) => <div role="status">{expanded ? 'Expanded' : 'Collapsed'}</div>}
			</Disclosure>,
		);
	});

	afterAll(() => {
		cleanup();
	});

	it('is expanded', () => {
		const status = screen.getByRole('status');
		expect(status).toHaveTextContent('Expanded');
	});

	it('toggles content', async () => {
		const trigger = screen.getByRole('button', { name: 'Click Me', expanded: true });
		await userEvent.click(trigger);
		const status = screen.getByRole('status');
		expect(status).toHaveTextContent('Collapsed');
		expect(onToggle).toBeCalledTimes(1);
		const [e] = onToggle.mock.calls[0];
		expect(e.expanded).toBe(false);
	});
});
