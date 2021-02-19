const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'content-type': 'text/html' });
	fs.createReadStream(path.join(__dirname, 'dist/', 'index.html')).pipe(res);
});

server.listen(process.env.PORT || 3000);
