var dotenv = require('dotenv');
var path = require('path');

dotenv.config({
	silent: process.env.NODE_ENV === 'production',
	path: path.resolve(__dirname, '..', '..', '..', '.api.env'),
});
