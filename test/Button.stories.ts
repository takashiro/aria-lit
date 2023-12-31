import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import type { ButtonProps, TriggerEvent, TriggerEventHandler } from '../src/Button';
import '../src/Button.js';
import './Button.scss';

let count = 0;
const onClick = jest.fn<void, [TriggerEvent]>(() => {
	count++;
	document.getElementById('message-box')!.textContent = `You clicked it (${count}).`;
});

const meta: Meta<ButtonProps> = {
	title: 'Controls/Button',
	tags: ['autodocs'],
	args: {
		disabled: false,
	},
	render: ({ disabled }) => html`
		<cindi-button @trigger=${onClick as TriggerEventHandler} .disabled=${disabled}>
			Click Me!
		</cindi-button>
		<div id="message-box" role="status"></div>
	`,
};

export default meta;

function setup(canvasElement: HTMLElement): HTMLElement {
	onClick.mockClear();
	count = 0;
	const canvas = within(canvasElement);
	return canvas.getByRole('button', { name: 'Click Me!' });
}

type Story = StoryObj<ButtonProps>;

export const Enabled: Story = {
	async play({ canvasElement, step }): Promise<void> {
		const button = setup(canvasElement);

		await step('click', async () => {
			await userEvent.click(button);
			await expect(onClick).toBeCalled();
		});

		await step('press Space', async () => {
			await userEvent.keyboard('{ }');
			await expect(onClick).toBeCalledTimes(2);
		});

		await step('press Enter', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(onClick).toBeCalledTimes(3);
		});
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	async play({ canvasElement }): Promise<void> {
		const button = setup(canvasElement);
		await userEvent.click(button);
		await expect(onClick).not.toBeCalled();
	},
};
