var mongoose = require('mongoose');
var placesApiResponseSchema = require('./mapsApi.schema');

const { Schema } = mongoose;

const placesSchema = new Schema(
	{
		cableId: {
			type: String,
			ref: 'Cable',
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
