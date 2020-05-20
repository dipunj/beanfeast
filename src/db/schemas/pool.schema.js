import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';

const { Schema } = mongoose;

const PoolSchema = new Schema(
	{
		cableId: {
			type: String,
			ref: 'Cable',
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

export default PoolSchema;
