var mongoose = require('mongoose');
var mongodb = require('mongodb');

var { Decimal128 } = mongodb;

const { Schema } = mongoose;

const PoolSchema = new Schema(
	{
		cableId: {
			type: String,
			ref: 'Cable',
			index: true,
		},
		sessionId: {
			type: String,
			required: true,
		},
		longitude: {
			type: Decimal128,
			required: true,
		},
		latitude: {
			type: Decimal128,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = PoolSchema;
