import express from 'express';
import waitOn from 'wait-on';
import cp from 'child_process';

const app = express();
app.use(express.static('storybook-static'));
const server = app.listen(6006);

console.log('Wait for express server...');
await waitOn({ resources: ['http://localhost:6006'] });

console.log('Run tests...')
const child = cp.spawn('npm', ['run', 'test-storybook'], { shell: true, stdio: 'inherit' });
child.once('exit', (exitCode) => {
	server.close();
	if (exitCode) {
		process.exit(exitCode);
	}
});
