const fs = require('fs');
var dotenv = require('dotenv');
var path = require('path');
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '..', '.frontend.env')));

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({ env: envConfig });
