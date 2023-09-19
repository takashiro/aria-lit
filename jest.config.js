/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/test/',
	],
};
