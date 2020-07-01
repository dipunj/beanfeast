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
		uniqueIdentifier: {
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
		createdAt: {
			type: Date,
			expires: 86400,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = SessionSchema;
