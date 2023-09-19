import { jest, expect, it } from '@jest/globals';
import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Clickable from '../src/Clickable';

it('should handle mouse events', async () => {
	const onTrigger = jest.fn();
	render(<Clickable onTrigger={onTrigger}>Click me!</Clickable>);
	const button = screen.getByRole('button', { name: 'Click me!' });
	await userEvent.click(button);
	expect(onTrigger).toBeCalledTimes(1);
});
