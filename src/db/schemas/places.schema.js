var mongoose = require('mongoose');
var placesApiResponseSchema = require('./mapsApi.schema');

const { Schema } = mongoose;

const placesSchema = new Schema(
	{
		poolId: {
			type: String,
			ref: 'Pool',
			index: true,
		},
		mapsData: {
			type: placesApiResponseSchema,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = placesSchema;
