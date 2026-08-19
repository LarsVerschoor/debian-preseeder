import http from "node:http";
import { readFile } from "node:fs/promises";
import getLocalIpAddress from "./ip-address.js";
import getConfig from "./config.js";

const [config, template] = await Promise.all([
	getConfig(),
	readFile('./preconfiguration.txt', 'utf8')
]);

let preseed = template;

for (const [key, value] of Object.entries(config)) {
	preseed = preseed.replaceAll(`{{${key}}}`, value);
}

console.log('\nPreseed config made.');

const server = http.createServer((req, res) => {
	if (req.method !== 'GET' || req.url !== '/preseed') {
		res.writeHead(404);
		res.end('Not found');
		return;
	}

	res.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf-8',
	});

	res.end(config);
});

server.listen(3000, () => {
	console.log(`\nHTTP server is listening, add \"http://${getLocalIpAddress()}:3000/preseed\" to your boot parameters.`);
});