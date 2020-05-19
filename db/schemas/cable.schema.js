import { mongoose } from 'mongoose';
import { shortid } from 'shortid';
import locationSchema from './location.schema';

const { Schema } = mongoose;

const CableSchema = new Schema(
	{
		_id: {
			type: String,
			default: shortid.generate,
		},
		fromTime: {
			type: Date,
			default: Date.now,
		},
		toTime: {
			type: Date,
			default: Date.now,
		},
		maxPeople: {
			type: Number,
			default: Infinity,
		},
		currPeople: {
			type: Number,
			default: 0,
		},
		centroid: {
			type: locationSchema,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default CableSchema;
