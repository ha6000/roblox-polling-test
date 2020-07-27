const URL = 'http://localhost:3000/';

const Axios = require('axios');
const axios = Axios.create({
	baseURL: URL
});

async function test() {
	const testRes = await axios.get('/');
	console.log(testRes.data);
}

test();