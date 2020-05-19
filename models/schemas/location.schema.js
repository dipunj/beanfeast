import { mongoose } from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

export default locationSchema;
