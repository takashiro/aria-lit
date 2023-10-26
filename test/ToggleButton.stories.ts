import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { ToggleButtonProps, ChangeEvent } from '../src/ToggleButton';
import '../src/ToggleButton';
import './ToggleButton.scss';

const onChange = jest.fn<void, [ChangeEvent]>();

const meta: Meta<ToggleButtonProps> = {
	title: 'Controls/ToggleButton',
	tags: ['autodocs'],
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: Boolean,
	},
	render: ({ disabled }) => html`
		<cindi-togglebutton .disabled=${disabled} @change=${onChange}>B</cindi-togglebutton>
	`,
};

export default meta;

type Story = StoryObj<ToggleButtonProps>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);

		await step('trigger it by mouse event', async () => {
			onChange.mockClear();
			await userEvent.click(screen.getByRole('button', { name: 'B' }));
			await expect(onChange).toBeCalledTimes(1);
			const e = onChange.mock.calls[0][0];
			await expect(e.detail.pressed).toBe(true);
			const button = screen.getByRole('button', { name: 'B', pressed: true });
			await expect(document.activeElement).toBe(button);
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

export const Disabled: Story = {
	args: {
		disabled: true,
	},

	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		onChange.mockClear();

		await step('trigger it by mouse event', async () => {
			await userEvent.click(screen.getByRole('button', { name: 'B' }));
			await expect(onChange).not.toBeCalled();
		});

		await step('trigger it by space key', async () => {
			await userEvent.keyboard('{ }');
			await expect(onChange).not.toBeCalled();
		});

		await step('trigger it by enter key', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(onChange).not.toBeCalled();
		});
	},
};
