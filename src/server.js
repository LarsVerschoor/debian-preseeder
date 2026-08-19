import http from "node:http";

export function startServer(preseed) {
	const server = http.createServer((req, res) => {
		if (req.method !== 'GET' || req.url !== '/preseed') {
			res.writeHead(404);
			res.end('Not found');
			return;
		}

		res.writeHead(200, {
			'Content-Type': 'text/plain; charset=utf-8',
		});

		res.end(preseed);
	});

	server.listen(3000, () => {
		console.log(`\nHTTP server is listening`);
	});
}
