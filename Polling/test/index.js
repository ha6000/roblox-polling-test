const Poller = require('../src');

const express = require('express');
const app = express();

const poller = new Poller();

const pollMiddleware = poller.middleware();
console.log(pollMiddleware)

app.use('/p', pollMiddleware);

app.listen(3000, () => {
	console.log('listening on port 3000');
})