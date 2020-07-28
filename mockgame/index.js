const URL = 'http://localhost:3000/';

const Axios = require('axios');
const axios = Axios.create({
	baseURL: URL,
});

async function test() {
	console.time('request');
	console.log('request sent');
	let testRes;
	try {
		testRes = await axios.get('/poll')
	}
	catch(err) {
		console.log('failed request');
		return console.log(err);
	}
	console.timeEnd('request');
	console.log(testRes.data);
	console.log(testRes.headers);
}

test();