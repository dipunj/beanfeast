import { mongoose } from 'mongoose';
import locationSchema from './location.schema';

const { Schema } = mongoose;

const PoolSchema = new Schema(
	{
		cableId: {
			type: String,
			ref: 'Cable',
			index: true,
		},
		personId: {
			type: String,
			required: true,
		},
		location: {
			type: locationSchema,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default PoolSchema;
