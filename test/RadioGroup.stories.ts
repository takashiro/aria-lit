import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import { RadioGroup, Radio, type RadioGroupProps, type ChangeEvent } from '../src/RadioGroup';

const onChange = jest.fn<void, [ChangeEvent<number>]>();

const meta: Meta<RadioGroupProps<number>> = {
	title: 'Widgets/RadioGroup',
	tags: ['autodocs'],
	render: () => html`
		<div id="my-question">Which color do you like?</div>
		<karuta-radiogroup @change=${onChange} aria-labelledby="my-question">
			<karuta-radio .value=${0}>Red</karuta-radio>
			<karuta-radio .value=${2}>Green</karuta-radio>
			<karuta-radio .value=${6}>Blue</karuta-radio>
		</karuta-radiogroup>
	`,
};

export default meta;

type Story = StoryObj<RadioGroupProps<number>>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);

		await step('select a radio via mouse', async () => {
			onChange.mockClear();
			const radio = screen.getByRole('radio', { name: 'Green' });
			expect(radio).toBeInstanceOf(Radio);
			expect(radio.parentElement).toBeInstanceOf(RadioGroup);
			await userEvent.click(radio);
			expect(document.activeElement).toBe(radio);
			expect(radio).toBeChecked();
			expect(onChange).toBeCalledTimes(1);
			const [event] = onChange.mock.calls[0];
			expect(event.detail.selected).toBe(2);
		});

		await step('select another radio via mouse', async () => {
			onChange.mockClear();
			const radio = screen.getByRole('radio', { name: 'Red' });
			await userEvent.click(radio);
			expect(document.activeElement).toBe(radio);
			expect(onChange).toBeCalledTimes(1);
			const [event] = onChange.mock.calls[0];
			expect(event.detail.selected).toBe(0);
		});

		await step('select a radio via arrow down', async () => {
			onChange.mockClear();
			await userEvent.keyboard('{ArrowDown}');
			const radio = screen.getByRole('radio', { name: 'Green' });
			expect(document.activeElement).toBe(radio);
			expect(onChange).toBeCalledTimes(1);
			const [event] = onChange.mock.calls[0];
			expect(event.detail.selected).toBe(2);
		});

		await step('do not trigger change event if focus is moved to the selected radio', async () => {
			onChange.mockClear();
			const radio = screen.getByRole('radio', { name: 'Green' });

			await userEvent.tab({ shift: true });
			expect(document.activeElement).not.toBe(radio);

			await userEvent.tab();
			expect(document.activeElement).toBe(radio);
			expect(onChange).not.toBeCalled();
		});

		await step('select a radio via arrow right', async () => {
			onChange.mockClear();
			await userEvent.keyboard('{ArrowRight}');
			const [event] = onChange.mock.calls[0];
			expect(event.detail.selected).toBe(6);
			expect(document.activeElement?.textContent).toBe('Blue');
		});

		await step('select a radio via arrow left', async () => {
			onChange.mockClear();
			await userEvent.keyboard('{ArrowLeft}');
			const [event] = onChange.mock.calls[0];
			expect(event.detail.selected).toBe(2);
			expect(document.activeElement?.textContent).toBe('Green');
		});

		await step('can select a radio via arrow up', async () => {
			onChange.mockClear();
			await userEvent.keyboard('{ArrowUp}');
			const [event] = onChange.mock.calls[0];
			expect(event.detail.selected).toBe(0);
			expect(document.activeElement?.textContent).toBe('Red');
		});
	}
};
