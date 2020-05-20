import mongoose from 'mongoose';
import placesApiResponseSchema from './mapsApi.schema';

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

export default placesSchema;
