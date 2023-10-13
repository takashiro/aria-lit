import { esbuildPlugin } from '@web/dev-server-esbuild';

const mode = process.env.MODE || 'dev';

export default {
	rootDir: '.',
	files: ['test/**/*.spec.ts'],
	nodeResolve: {
		exportConditions: mode === 'dev' ? ['development'] : [],
	},
	plugins: [
		esbuildPlugin({
			ts: true,
			tsconfig: './tsconfig.json',
		}),
	],
};
