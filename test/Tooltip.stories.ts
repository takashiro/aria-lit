import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { html } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { TooltipProps } from '../src/Tooltip.js';
import '../src/Tooltip.js';
import './Tooltip.scss';

interface TooltopControls extends TooltipProps {
	content: string
}

const meta: Meta<TooltopControls> = {
	title: 'Widgets/Tooltip',
	tags: ['autodocs'],
	render: ({ side, content }) => html`
		<div class="tooltip-canvas">
			<button type="button">Hover me.</button>
			<cindi-tooltip side=${ifDefined(side)} .offset=${12} .arrow=${'svg:first-child'}>
				<svg class="arrow" viewBox="0 0 30 10" preserveAspectRatio="none" fill="currentColor">
					<polygon points="0,0 30,0 15,10"></polygon>
				</svg>
				${content}
			</cindi-tooltip>
		</div>
	`,
};

export default meta;

type Story = StoryObj<TooltopControls>;

export const Auto: Story = {
	args: {
		content: 'This is a tooltip.',
	},
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

export const Top: Story = {
	args: {
		side: 'top',
		content: 'A tooltip on top.',
	},
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const trigger = screen.getByRole('button', { name: 'Hover me.' });

		await step('hover on it', async () => {
			await userEvent.hover(trigger);
			const tooltip = screen.getByRole('tooltip');
			await expect(tooltip).toBeVisible();
		});
	},
};

export const Left: Story = {
	args: {
		side: 'left',
		content: 'A tooltip on left.',
	},
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const trigger = screen.getByRole('button', { name: 'Hover me.' });

		await step('hover on it', async () => {
			await userEvent.hover(trigger);
			const tooltip = screen.getByRole('tooltip');
			await expect(tooltip).toBeVisible();
		});
	},
};

export const Bottom: Story = {
	args: {
		side: 'bottom',
		content: 'A tooltip on bottom.',
	},
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const trigger = screen.getByRole('button', { name: 'Hover me.' });

		await step('hover on it', async () => {
			await userEvent.hover(trigger);
			const tooltip = screen.getByRole('tooltip');
			await expect(tooltip).toBeVisible();
		});
	},
};

export const Right: Story = {
	args: {
		side: 'right',
		content: 'A tooltip on right.',
	},
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const trigger = screen.getByRole('button', { name: 'Hover me.' });

		await step('hover on it', async () => {
			await userEvent.hover(trigger);
			const tooltip = screen.getByRole('tooltip');
			await expect(tooltip).toBeVisible();
		});
	},
};
