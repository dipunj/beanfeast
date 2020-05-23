var mongoose = require('mongoose');
var { Decimal128 } = require('mongodb');

const { Schema } = mongoose;

const SessionSchema = new Schema(
	{
		poolId: {
			type: String,
			ref: 'Pool',
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

module.exports = SessionSchema;
