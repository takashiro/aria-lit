import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import { ToggleButton, type ToggleButtonProps, type ChangeEvent } from '../src/ToggleButton';

const onChange = jest.fn<void, [ChangeEvent]>();

const meta: Meta<ToggleButtonProps> = {
	title: 'Controls/ToggleButton',
	tags: ['autodocs'],
	render: () => html`
		<karuta-togglebutton @change=${onChange}>Bold</karuta-togglebutton>
	`,
};

export default meta;

type Story = StoryObj<ToggleButtonProps>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);

		await step('trigger it by mouse event', async () => {
			onChange.mockClear();
			await userEvent.click(screen.getByRole('button', { name: 'Bold' }));
			await expect(onChange).toBeCalledTimes(1);
			const e = onChange.mock.calls[0][0];
			await expect(e.detail.pressed).toBe(true);
			const button = screen.getByRole('button', { name: 'Bold', pressed: true });
			await expect(document.activeElement).toBe(button);
			await expect(button).toBeInstanceOf(ToggleButton);
		});

		await step('trigger it by space key', async () => {
			onChange.mockClear();
			await userEvent.keyboard('{ }');
			await expect(onChange).toBeCalledTimes(1);
			const [e] = onChange.mock.calls[0];
			await expect(e.detail.pressed).toBe(false);
		});

		await step('trigger it by enter key', async () => {
			onChange.mockClear();
			await userEvent.keyboard('{Enter}');
			await expect(onChange).toBeCalledTimes(1);
			const [e] = onChange.mock.calls[0];
			await expect(e.detail.pressed).toBe(true);
		});
	},
};
