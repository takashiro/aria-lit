import { customElement } from 'lit/decorators.js';

export interface ToastProps {
	/**
	 * How long the toast should be displayed for. (Default: 3000ms)
	 */
	duration?: number;

	/**
	 * CSS selector to find a viewport where toasts should be displayed.
	 */
	viewport?: string;
}

@customElement('cindi-toast')
export default class Toast extends HTMLElement {
	role = 'alert';

	duration?: number;

	viewport?: string;

	publish(): void {
		const viewport = this.#getViewport();
		viewport.appendChild(this);
		setTimeout(() => {
			this.dataset.state = 'enter';
		}, 0);
		const duration = this.duration ?? 3000;
		setTimeout(() => {
			this.dataset.state = 'leave';
		}, duration);
		setTimeout(() => {
			this.remove();
		}, duration + 100);
	}

	#getViewport(): HTMLElement {
		if (!this.viewport) {
			return document.body;
		}
		return document.querySelector(this.viewport) ?? document.body;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'cindi-toast': Toast;
	}
}
