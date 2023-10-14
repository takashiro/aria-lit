import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit/html.js';

import '../src/Clickable';

const onClick = () => alert('You clicked me!');

const meta: Meta<unknown> = {
	title: 'Controls/Button',
	tags: ['autodocs'],
	render: () => html`
		<kart-clickable @click=${onClick}>This is a clickable element.</kart-clickable>
	`,
};

export default meta;

type Story = StoryObj<unknown>;

export const Primary: Story = {};
