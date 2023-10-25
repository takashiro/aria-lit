import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { FocusTrapProps } from '../../src/common/FocusTrap';
import '../../src/common/FocusTrap';

const onEscape = jest.fn();

const meta: Meta<FocusTrapProps> = {
	title: 'Keyboard/FocusTrap',
	tags: ['autodocs'],
	render: ({ pattern }) => html`
		<button type="button">Before</button>
		<p>--- Focus Trap ---</p>
		<karuta-focustrap .pattern=${pattern} @escape=${onEscape}>
			<button type="button">Native Button</button>
			<a id="anchor">Page Anchor</a>
			<a href="https://www.google.com">Google</a>
			<div>This is a test.</div>
			<input type="text" aria-label="User Name">
			<textarea aria-label="Note"></textarea>
			<div role="checkbox" tabIndex="0" aria-label="Toggle" aria-checked style="width: 10px; height: 10px"></div>
		</karuta-focustrap>
		<p>--- Focus Trap ---</p>
		<button type="button">After</button>
	`,
};

export default meta;

type Story = StoryObj<FocusTrapProps>;

export const Default: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const canvas = within(canvasElement);

		await step('initialize focus position', () => {
			const beforeButton = canvas.getByRole('button', { name: 'Before' });
			beforeButton.focus();
		});

		await step('focus on the first element', async () => {
			await userEvent.tab();
			const button = canvas.getByRole('button', { name: 'Native Button' });
			await expect(button).toBe(document.activeElement);
		});

		await step('should go to link', async () => {
			await userEvent.tab();
			const google = canvas.getByRole('link', { name: 'Google' });
			await expect(google).toBe(document.activeElement);
		});

		await step('should go to input', async () => {
			await userEvent.tab();
			const username = canvas.getByRole('textbox', { name: 'User Name' });
			await expect(username).toBe(document.activeElement);
		});

		await step('should go to textarea', async () => {
			await userEvent.tab();
			const note = canvas.getByRole('textbox', { name: 'Note' });
			await expect(note).toBe(document.activeElement);
		});

		await step('should go to checkbox', async () => {
			await userEvent.tab();
			const checkbox = canvas.getByRole('checkbox', { name: 'Toggle' });
			await expect(checkbox).toBe(document.activeElement);
		});

		await step('should go back to the first element', async () => {
			await userEvent.tab();
			const button = canvas.getByRole('button', { name: 'Native Button' });
			await expect(button).toBe(document.activeElement);
		});

		await step('should go back to the last element', async () => {
			await userEvent.tab({ shift: true });
			const checkbox = canvas.getByRole('checkbox', { name: 'Toggle' });
			await expect(checkbox).toBe(document.activeElement);
		});

		await step('should go back to textarea', async () => {
			await userEvent.tab({ shift: true });
			const note = canvas.getByRole('textbox', { name: 'Note' });
			await expect(note).toBe(document.activeElement);
		});

		await step('should go back to input', async () => {
			await userEvent.tab({ shift: true });
			const username = canvas.getByRole('textbox', { name: 'User Name' });
			await expect(username).toBe(document.activeElement);
		});

		await step('should handle Esc key', async () => {
			onEscape.mockClear();
			await userEvent.keyboard('{Escape}');
			await expect(onEscape).toBeCalledTimes(1);
		});

		await step('should go back to link', async () => {
			await userEvent.tab({ shift: true });
			const google = canvas.getByRole('link', { name: 'Google' });
			await expect(google).toBe(document.activeElement);
		});

		await step('should go back to button', async () => {
			await userEvent.tab({ shift: true });
			const button = canvas.getByRole('button', { name: 'Native Button' });
			await expect(button).toBe(document.activeElement);
		});

		await step('should go back to checkbox', async () => {
			await userEvent.tab({ shift: true });
			const checkbox = canvas.getByRole('checkbox', { name: 'Toggle' });
			await expect(checkbox).toBe(document.activeElement);
		});
	},
};

export const Custom: Story = {
	args: {
		pattern: 'a[href]',
	},
	async play({ canvasElement, step }): Promise<void> {
		const canvas = within(canvasElement);

		await step('initialize focus position', async () => {
			const beforeButton = canvas.getByRole('button', { name: 'Before' });
			beforeButton.focus();
			await userEvent.tab();
		});

		await step('focus on link', async () => {
			await userEvent.tab();
			const google = canvas.getByRole('link', { name: 'Google' });
			await expect(google).toBe(document.activeElement);
		});

		await step('should stay on the same link (forward)', async () => {
			await userEvent.tab();
			const google = canvas.getByRole('link', { name: 'Google' });
			await expect(google).toBe(document.activeElement);
		});

		await step('should stay on the same link (backward)', async () => {
			await userEvent.tab({ shift: true });
			const google = canvas.getByRole('link', { name: 'Google' });
			await expect(google).toBe(document.activeElement);
		});
	},
};
