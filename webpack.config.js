const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { NODE_ENV = 'production' } = process.env;
const babelLoader = 'babel-loader';

module.exports = {
	entry: './src/bin/www',
	mode: NODE_ENV,
	target: 'node',
	devtool: 'cheap-inline-module-source-map',
	output: {
		path: `${__dirname}/build`,
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: [babelLoader],
			},
		],
	},
	externals: [nodeExternals()],
	watch: NODE_ENV === 'development',
	plugins: [
		new WebpackShellPlugin({
			onBuildEnd: ['yarn run:dev'],
		}),
	],
};
