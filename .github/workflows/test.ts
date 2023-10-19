import express from 'express';
import waitOn from 'wait-on';
import cp from 'child_process';

const app = express();
app.use(express.static('storybook-static'));
const server = app.listen(6006);

await waitOn({ resources: ['http://localhost:6006'] });
cp.execSync('npm run test-storybook');

server.close();
