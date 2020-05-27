var mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema(
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

module.exports = PlaceSchema;
