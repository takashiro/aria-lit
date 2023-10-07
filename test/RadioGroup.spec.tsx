import {
	jest,
	describe,
	beforeAll,
	afterAll,
	afterEach,
	expect,
	it,
} from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import { cleanup, render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import RadioGroup, { type ChangeEventHandler, Radio } from '../src/RadioGroup';

describe('Radio Group', () => {
	const onChange = jest.fn<ChangeEventHandler<number>>();

	beforeAll(() => {
		render(<Radio<number> value={0} />);
		render(
			<>
				<button type="button">Previous</button>
				<RadioGroup<number> onChange={onChange}>
					<Radio<number> value={0}>Option A</Radio>
					<Radio<number> value={2}>Option B</Radio>
					<Radio<number> value={6}>Option C</Radio>
				</RadioGroup>
				<button type="button">Next</button>
			</>,
		);
	});

	afterAll(() => {
		cleanup();
	});

	afterEach(() => {
		onChange.mockClear();
	});

	it('can select a radio via mouse', async () => {
		const radio = screen.getByRole('radio', { name: 'Option B' });
		await userEvent.click(radio);
		expect(document.activeElement).toBe(radio);
		expect(radio).toBeChecked();
		expect(onChange).toBeCalledTimes(1);
		const [event] = onChange.mock.calls[0];
		expect(event.selected).toBe(2);
	});

	it('can select another radio via mouse', async () => {
		const radio = screen.getByRole('radio', { name: 'Option A' });
		await userEvent.click(radio);
		expect(document.activeElement).toBe(radio);
		expect(onChange).toBeCalledTimes(1);
		const [event] = onChange.mock.calls[0];
		expect(event.selected).toBe(0);
	});

	it('can select a radio via arrow down', async () => {
		await userEvent.keyboard('{ArrowDown}');
		const radio = screen.getByRole('radio', { name: 'Option B' });
		expect(document.activeElement).toBe(radio);
		expect(onChange).toBeCalledTimes(1);
		const [event] = onChange.mock.calls[0];
		expect(event.selected).toBe(2);
	});

	it('does not trigger change event if focus is moved to the selected radio', async () => {
		const radio = screen.getByRole('radio', { name: 'Option B' });

		await userEvent.tab({ shift: true });
		expect(document.activeElement).not.toBe(radio);

		await userEvent.tab();
		expect(document.activeElement).toBe(radio);
		expect(onChange).not.toBeCalled();
	});

	it('can select a radio via arrow right', async () => {
		await userEvent.keyboard('{ArrowRight}');
		const [event] = onChange.mock.calls[0];
		expect(event.selected).toBe(6);
		expect(document.activeElement?.textContent).toBe('Option C');
	});

	it('can select a radio via arrow left', async () => {
		await userEvent.keyboard('{ArrowLeft}');
		const [event] = onChange.mock.calls[0];
		expect(event.selected).toBe(2);
		expect(document.activeElement?.textContent).toBe('Option B');
	});

	it('can select a radio via arrow up', async () => {
		await userEvent.keyboard('{ArrowUp}');
		const [event] = onChange.mock.calls[0];
		expect(event.selected).toBe(0);
		expect(document.activeElement?.textContent).toBe('Option A');
	});
});

describe('Customized Radio Group', () => {
	it('renders default option', () => {
		render(
			<>
				<div id="my-radio">My Radio</div>
				<RadioGroup<string> selected="a" aria-labelledby="my-radio">
					<Radio<string> value="a">Option 1</Radio>
					<Radio<string> value="b">Option 2</Radio>
				</RadioGroup>
			</>,
		);

		const a = screen.getByRole('radio', { name: 'Option 1' });
		expect(a).toBeChecked();

		const group = screen.getByRole('radiogroup', { name: 'My Radio' });
		expect(group).toContainElement(a);

		cleanup();
	});
});
