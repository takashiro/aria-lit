import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import Button, { type ButtonProps } from '../src/Button';

customElements.define('my-button', Button);

declare global {
	interface HTMLElementTagNameMap {
		'my-button': Button;
	}
}

let count = 0;
const onClick = jest.fn(() => {
	count++;
	document.getElementById('message-box')!.textContent = `You clicked it (${count}).`;
});

const meta: Meta<ButtonProps> = {
	title: 'Controls/Button',
	tags: ['autodocs'],
	render: ({ disabled }) => html`
		<my-button @trigger=${onClick} .disabled=${disabled}>
			Click Me!
		</my-button>
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
			expect(onClick).toBeCalled();
		});

		await step('press Space', async () => {
			await userEvent.keyboard('{ }');
			expect(onClick).toBeCalledTimes(2);
		});

		await step('press Enter', async () => {
			await userEvent.keyboard('{Enter}');
			expect(onClick).toBeCalledTimes(3);
		});
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	async play({ canvasElement }): Promise<void> {
		const button = setup(canvasElement);
		await userEvent.click(button);
		expect(onClick).not.toBeCalled();
	}
};
