const path = require('path');
const express = require('express');

const app = express();

const PACKAGE = path.join(__dirname, 'package.json');

app.get('/', (req, res) => {
	res.sendFile(PACKAGE);
})

app.get('/poll', (req, res) => {
	res.send('test');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});