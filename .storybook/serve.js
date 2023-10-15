import express from 'express';

const app = express();
app.use(express.static('storybook-static'));
app.listen(6006);
