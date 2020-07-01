var mongoose = require('mongoose');
var shortid = require('shortid');
var { Decimal128 } = require('mongodb');

const { Schema } = mongoose;

const PoolSchema = new Schema(
	{
		_id: {
			type: String,
			default: shortid.generate,
		},
		fromTime: {
			type: Date,
			default: Date.now(),
		},
		toTime: {
			type: Date,
			default: Date.now(),
		},
		maxPoolSize: {
			type: Number,
			default: Infinity,
		},
		currPoolSize: {
			type: Number,
			default: 0,
		},
		createdBy: {
			type: String,
		},
		centroidLatitude: {
			type: Decimal128,
		},
		centroidLongitude: {
			type: Decimal128,
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

module.exports = PoolSchema;
