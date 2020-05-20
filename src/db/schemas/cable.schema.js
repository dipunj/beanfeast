import mongoose from 'mongoose';
import shortid from 'shortid';

const { Schema } = mongoose;

const CableSchema = new Schema(
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

export default CableSchema;
