import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import { FocusList, type FocusListProps } from '../../src/common/FocusList';

const meta: Meta<FocusListProps> = {
	title: 'Keyboard/FocusList',
	tags: ['autodocs'],
	render: ({ circular, orientation }) => html`
		<button type="button">Before</button>
		<hr>
		<karuta-focuslist .selector="button" .circular=${circular} .orientation=${orientation}>
				<button type="button" tabindex="-1">A</button>
				<button type="button" tabindex="-1">B</button>
				<button type="button" tabindex="-1">C</button>
		</karuta-focuslist>
		<hr>
		<button type="button">After</button>
	`,
};

export default meta;

type Story = StoryObj<FocusListProps>;

export const ButtonList: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const a = screen.getByRole('button', { name: 'A' });
		const b = screen.getByRole('button', { name: 'B' });
		const c = screen.getByRole('button', { name: 'C' });

		expect(a.parentElement).toBeInstanceOf(FocusList);

		await step('can move focus forward', async () => {
			a.focus();
			await userEvent.keyboard('{ArrowRight}');
			expect(document.activeElement).toBe(b);
			await userEvent.keyboard('{ArrowDown}');
			expect(document.activeElement).toBe(c);
			await userEvent.keyboard('{ArrowDown}');
			expect(document.activeElement).toBe(c);
		});

		await step('can move focus backforward', async () => {
			await userEvent.keyboard('{ArrowUp}');
			expect(document.activeElement).toBe(b);
			await userEvent.keyboard('{ArrowLeft}');
			expect(document.activeElement).toBe(a);
			await userEvent.keyboard('{ArrowLeft}');
			expect(document.activeElement).toBe(a);
		});

		await step('ignores other keys', async () => {
			await userEvent.keyboard('{Enter}');
			expect(document.activeElement).toBe(a);
		});
	},
};

export const CircularButtonList: Story = {
	args: {
		circular: true,
	},

	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const a = screen.getByRole('button', { name: 'A' });
		const b = screen.getByRole('button', { name: 'B' });
		const c = screen.getByRole('button', { name: 'C' });

		await step('can move focus forward', async () => {
			a.focus();
			await userEvent.keyboard('{ArrowRight}');
			expect(document.activeElement).toBe(b);
			await userEvent.keyboard('{ArrowDown}');
			expect(document.activeElement).toBe(c);
			await userEvent.keyboard('{ArrowDown}');
			expect(document.activeElement).toBe(a);
		});

		await step('can move focus backforward', async () => {
			await userEvent.keyboard('{ArrowUp}');
			expect(document.activeElement).toBe(c);
			await userEvent.keyboard('{ArrowLeft}');
			expect(document.activeElement).toBe(b);
			await userEvent.keyboard('{ArrowLeft}');
			expect(document.activeElement).toBe(a);
		});
	},
};

export const VerticalButtonList: Story = {
	args: {
		orientation: 'portrait',
	},

	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);

		const a = screen.getByRole('button', { name: 'A' });
		const b = screen.getByRole('button', { name: 'B' });

		await step('accepts arrow down', async () => {
			a.focus();
			await userEvent.keyboard('{ArrowRight}');
			expect(document.activeElement).toBe(a);
			await userEvent.keyboard('{ArrowDown}');
			expect(document.activeElement).toBe(b);
		});

		await step('accepts arrow up', async () => {
			await userEvent.keyboard('{ArrowLeft}');
			expect(document.activeElement).toBe(b);
			await userEvent.keyboard('{ArrowUp}');
			expect(document.activeElement).toBe(a);
		});
	},
};

export const HorizontalFocusList: Story = {
	args: {
		orientation: 'landscape',
	},

	async play({ canvasElement, step }): Promise<void> {
		const screen = within(canvasElement);
		const a = screen.getByRole('button', { name: 'A' });
		const b = screen.getByRole('button', { name: 'B' });

		await step('accepts arrow right', async () => {
			a.focus();
			await userEvent.keyboard('{ArrowDown}');
			expect(document.activeElement).toBe(a);
			await userEvent.keyboard('{ArrowRight}');
			expect(document.activeElement).toBe(b);
		});

		await step('accepts arrow left', async () => {
			await userEvent.keyboard('{ArrowUp}');
			expect(document.activeElement).toBe(b);
			await userEvent.keyboard('{ArrowLeft}');
			expect(document.activeElement).toBe(a);
		});
	},
};
