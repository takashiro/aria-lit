import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { TooltipProps } from '../src/Tooltip';
import '../src/Tooltip';

import './Tooltip.stories.scss';

const meta: Meta<TooltipProps> = {
	title: 'Widgets/Tooltip',
	tags: ['autodocs'],
	render: () => html`
		<button type="button">Hover me.</button>
		<karuta-tooltip>
			This is why the button is here.
		</karuta-tooltip>
	`,
};

export default meta;

type Story = StoryObj<TooltipProps>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const trigger = screen.getByRole('button', { name: 'Hover me.' });

		await step('hover on it', async () => {
			await userEvent.hover(trigger);
			const tooltip = screen.getByRole('tooltip');
			await expect(tooltip).toBeVisible();
		});

		await step('leave it', async () => {
			await userEvent.unhover(trigger);
			const tooltip = screen.queryByRole('tooltip');
			await expect(tooltip).toBeNull();
		});

		await step('focus on it', async () => {
			await userEvent.click(trigger);
			const tooltip = screen.getByRole('tooltip');
			await expect(tooltip).toBeVisible();
		});

		await step('dismiss on it', async () => {
			await userEvent.keyboard('{Escape}');
			const tooltip = screen.queryByRole('tooltip');
			await expect(tooltip).toBeNull();
		});
	},
};
