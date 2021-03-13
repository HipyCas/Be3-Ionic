
const path = require('path');

const express = require('express');
const cors = require('cors');

const Server = require('http').Server;

//* APP DECLARATION AND MIDDLEWARE
// Create express app object
const app = express();
// Set CORS rules
app.use(
	cors({
		origin: function (origin, callback) {
			/*let allowedOrigins = [
				'localhost:5000',
				'localhost:3000',
				'localhost:3001',
				'172.17.203.241:3000',
				'172.17.203.241:3001',
				'172.17.203.241:5000',
				'acer.duo:5000',
				'acer.duo:3000',
				'acer.duo:3001',
			];*/

			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);

			//if (allowedOrigins.indexOf(origin) === -1) {
			//	var msg =
			//		'The CORS policy for this site does not ' +
			//		'allow access from the specified Origin.';
			//	return callback(new Error(msg), false);
			//}
			return callback(null, true);
		},
	})
);
// Serve static files
app.use('/', express.static(path.join(__dirname, 'dist/')));

//* ROUTES
// Serve index.html file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//* SERVER INITIATION
Server(app).listen(process.env.PORT || 3000, () => {
	log(`Server listening in *:${process.env.PORT || 3000}`);
});

//* CUSTOM FUNCTIONS
/**
 * Simple wrapper for log which includes date and time and a '>' character at the beginning of every line
 *
 * @param {string} str A string to log
 * @param {object} dateFormatOptions An object to be passed to the Intl.DateTimeFormat method
 */
function log(
	str,
	dateFormatOptions = {
		dateStyle: 'full',
		timeStyle: 'full',
	}
) {
	console.log(
		`${Intl.DateTimeFormat('es', dateFormatOptions).format(
			new Date(Date.now())
		)}> ${str}`
	);
}
