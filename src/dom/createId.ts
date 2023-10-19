let idCount = 0;

export default function createId(): string {
	idCount++;
	return `karuta-${idCount.toString(32)}`;
}
