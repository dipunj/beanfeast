const fs = require('fs');
var dotenv = require('dotenv');
var path = require('path');
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '..', '.frontend.env')));

module.exports = {
	env: envConfig,
};
