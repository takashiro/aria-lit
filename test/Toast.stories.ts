import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit/html.js';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import type { ToastProps } from '../src/Toast';
import Toast from '../src/Toast.js';
import './Toast.scss';

function showToast(duration?: number): void {
	const toast = new Toast();
	toast.viewport = '#toast-viewport';
	if (duration) {
		toast.duration = duration;
	}
	toast.textContent = 'This is a new toast!';
	toast.publish();
}

const meta: Meta<ToastProps> = {
	title: 'Widgets/Toast',
	tags: ['autodocs'],
	render: ({ duration }) => html`
		<button @click=${() => showToast(duration)}>Show Toast</button>
		<div id="toast-viewport"></div>
	`,
	args: {
		duration: 3000,
	},
};

export default meta;

type Story = StoryObj<ToastProps>;

export const Enabled: Story = {
	async play({ canvasElement }): Promise<void> {
		const screen = within(canvasElement);
		const button = screen.getByRole('button', { name: 'Show Toast' });
		await userEvent.click(button);
		const alert = screen.getByRole('alert');
		await expect(alert).toHaveTextContent('This is a new toast!');
	},
};
