import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { CheckboxProps, ChangeEvent, ChangeEventHandler } from '../src/Checkbox';
import '../src/Checkbox.js';

const onChange = jest.fn<void, [ChangeEvent]>();

const meta: Meta<CheckboxProps> = {
	title: 'Widgets/Checkbox',
	tags: ['autodocs'],
	render: () => html`
		<cindi-checkbox @change=${onChange as ChangeEventHandler}>Toggle me!</cindi-checkbox>
	`,
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		onChange.mockClear();
		const screen = within(canvasElement);
		const checkbox = screen.getByRole('checkbox', { name: 'Toggle me!' });

		await step('can be triggered by mouse event', async () => {
			await expect(checkbox).not.toBeChecked();
			await userEvent.click(checkbox);
			await expect(onChange).toBeCalledTimes(1);
			const e = onChange.mock.calls[0][0];
			await expect(e.detail.checked).toBe(true);
			await expect(checkbox).toBeChecked();
			await expect(document.activeElement).toBe(checkbox);
			onChange.mockClear();
		});

		await step('can be triggered by space key', async () => {
			await userEvent.keyboard('{ }');
			await expect(onChange).toBeCalledTimes(1);
			const e = onChange.mock.calls[0][0];
			await expect(e.detail.checked).toBe(false);
			await expect(checkbox).not.toBeChecked();
			onChange.mockClear();
		});

		await step('cannot be triggered by enter key', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(onChange).not.toBeCalled();
		});
	},
};
