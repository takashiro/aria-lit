import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';
import { html } from 'lit/html.js';

import { Clickable, type ClickableProps } from '../src/Clickable';

let count = 0;
const onClick = jest.fn(() => {
	count++;
	document.getElementById('message-box')!.textContent = `You clicked it (${count}).`;
});

const meta: Meta<ClickableProps> = {
	title: 'Controls/Button',
	tags: ['autodocs'],
	render: ({ disabled }) => html`
		<kart-clickable @click=${onClick} ?disabled=${disabled}>
			Click Me!
		</kart-clickable>
		<div id="message-box" role="status"></div>
	`,
};

export default meta;

function setup(canvasElement: HTMLElement): HTMLElement {
	onClick.mockClear();
	const component = canvasElement.querySelector('kart-clickable')!;
	expect(component).toBeInstanceOf(Clickable);
	return component.shadowRoot?.firstElementChild as HTMLDivElement;
}

type Story = StoryObj<ClickableProps>;

export const Click: Story = {
	async play({ canvasElement }): Promise<void> {
		const button = setup(canvasElement);
		await userEvent.click(button);
		expect(onClick).toBeCalled();
	}
};

export const PressSpace: Story = {
	async play({ canvasElement }): Promise<void> {
		const button = setup(canvasElement);
		button.focus();
		await userEvent.keyboard('{ }');
		expect(onClick).toBeCalledTimes(1);
	}
};

export const PressEnter: Story = {
	async play({ canvasElement }): Promise<void> {
		const button = setup(canvasElement);
		button.focus();
		await userEvent.keyboard('{Enter}');
		expect(onClick).toBeCalledTimes(1);
	}
};

export const ClickDisabled: Story = {
	args: {
		disabled: true,
	},
	async play({ canvasElement }): Promise<void> {
		const button = setup(canvasElement);
		await userEvent.click(button);
		expect(onClick).not.toBeCalled();
	}
};
