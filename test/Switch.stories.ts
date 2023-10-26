import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { SwitchProps, ChangeEvent } from '../src/Switch';
import '../src/Switch';

const onChange = jest.fn<void, [ChangeEvent]>();

const meta: Meta<SwitchProps> = {
	title: 'Widgets/Switch',
	tags: ['autodocs'],
	render: () => html`
		<cindi-switch @change=${onChange}>Toggle me!</cindi-switch>
	`,
};

export default meta;

type Story = StoryObj<SwitchProps>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		onChange.mockClear();
		const screen = within(canvasElement);
		const swit = screen.getByRole('switch', { name: 'Toggle me!' });

		await step('can be triggered by mouse event', async () => {
			await expect(swit).not.toBeChecked();
			await userEvent.click(swit);
			await expect(onChange).toBeCalledTimes(1);
			const e = onChange.mock.calls[0][0];
			await expect(e.detail.checked).toBe(true);
			await expect(swit).toBeChecked();
			await expect(document.activeElement).toBe(swit);
			onChange.mockClear();
		});

		await step('can be triggered by space key', async () => {
			await userEvent.keyboard('{ }');
			await expect(onChange).toBeCalledTimes(1);
			const e = onChange.mock.calls[0][0];
			await expect(e.detail.checked).toBe(false);
			await expect(swit).not.toBeChecked();
			onChange.mockClear();
		});

		await step('cannot be triggered by enter key', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(onChange).not.toBeCalled();
		});
	},
};
