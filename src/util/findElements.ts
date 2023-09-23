/**
 * Find HTML elements.
 * @param container Where the elements are located.
 * @param pattern CSS selector to find the elements.
 * @returns HTML elements.
 */
export default function findElements(container: HTMLElement, pattern: string): HTMLElement[] {
	const elements = container.querySelectorAll(pattern);
	return [...elements].filter((e) => e instanceof HTMLElement) as HTMLElement[];
}
