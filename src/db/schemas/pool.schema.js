var mongoose = require('mongoose');
var shortid = require('shortid');

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
			type: Number,
		},
		centroidLongitude: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = PoolSchema;
