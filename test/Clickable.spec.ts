import { fixture, expect, oneEvent } from '@open-wc/testing';
import { stub } from 'sinon';
import { html } from 'lit/static-html.js';

import { Clickable } from '../src/Clickable';

describe('Clickable', () => {
	it('is defined', () => {
		const e = document.createElement('kart-clickable');
		expect(e).to.be.instanceOf(Clickable);
	});

	it('is accessible', async () => {
		const e = await fixture(html`<kart-clickable>Click me!</kart-clickable>`)
		await expect(e).to.be.accessible();
		expect(e.textContent).to.equal('Click me!');
	});

	it('can be clicked', async () => {
		const e = await fixture(html`<kart-clickable>Click me!</kart-clickable>`)
		setTimeout(() => e.shadowRoot!.querySelector<HTMLElement>('[role="button"]')!.click());
		await oneEvent(e, 'click');
	});

	it('can respond to Enter or Space', async () => {
		const onClick = stub();
		const e = await fixture(html`<kart-clickable @click=${onClick}>Click me!</kart-clickable>`);
		const button = e.shadowRoot!.querySelector<HTMLElement>('[role="button"]')!;
		button.focus();
		setTimeout(() => button.dispatchEvent(new KeyboardEvent('keydown', {
			key: 'Enter',
		})));
		await oneEvent(e, 'click');
		expect(onClick).to.be.callCount(1);
	});

	it('does not respond to other keys', async () => {
		const onClick = stub();
		const e = await fixture(html`<kart-clickable @click=${onClick}>Click me!</kart-clickable>`);
		const button = e.shadowRoot!.querySelector<HTMLElement>('[role="button"]')!;
		button.focus();
		button.dispatchEvent(new KeyboardEvent('keydown', {
			key: 'Enter',
		}));
		expect(onClick).to.be.callCount(1);
	});
});
