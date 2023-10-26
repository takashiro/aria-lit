let idCount = 0;

export default function createId(): string {
	idCount++;
	return `cindi-${idCount.toString(32)}`;
}
