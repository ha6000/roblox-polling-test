const path = require('path');
const express = require('express');

const app = express();

const PACKAGE = path.join(__dirname, 'package.json');

const POLLTIMEOUT = 12 * 60 * 1000;

app.get('/', (req, res) => {
	res.sendFile(PACKAGE);
})

app.get('/poll', (req, res) => {
	req.socket.setTimeout(POLLTIMEOUT);
	setTimeout(() => {res.send('test')}, 5 * 60 * 1000);
});

const server = app.listen(3000, () => {
	console.log('Listening on port 3000');
});