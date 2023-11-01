import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { DisclosureProps, ToggleEvent } from '../src/Disclosure';
import '../src/Disclosure.js';

const onChange = jest.fn<void, [ToggleEvent]>();

const meta: Meta<DisclosureProps> = {
	title: 'Widgets/Disclosure',
	tags: ['autodocs'],
	render: () => html`
		<cindi-disclosure @change=${onChange}>
			<span slot="trigger">Toggle me!</span>
			<p data-testid="my-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
				ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
				in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
				sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.</p>
		</cindi-disclosure>
	`,
};

export default meta;

type Story = StoryObj<DisclosureProps>;

export const Default: Story = {
	async play({ canvasElement, step }): Promise<void> {
		onChange.mockClear();

		const screen = within(canvasElement);

		const disclosure = canvasElement.querySelector('cindi-disclosure')!;

		await step('should be hidden by default', async () => {
			const content = screen.getByTestId('my-content');
			await expect(content.assignedSlot).toBeNull();
		});

		await step('toggle content', async () => {
			const shadow = within(disclosure.shadowRoot as unknown as HTMLElement);
			const trigger = shadow.getByRole('button', { name: 'Toggle me!', expanded: false });
			await userEvent.click(trigger);
			const content = screen.getByTestId('my-content');
			await expect(content.assignedSlot).toBeVisible();
		});
	},
};
