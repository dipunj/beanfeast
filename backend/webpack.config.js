const path = require('path');

module.exports = {
	entry: './src/bin/www.js',
	output: {
		path: path.resolve(__dirname, '..', 'build/backend'),
		filename: 'api.bundle.js',
		libraryTarget: 'commonjs',
	},
	target: 'async-node',
	mode: 'production',
};
