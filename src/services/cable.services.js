var Cable = require('../db/models/cable.model');

// TODO: create transaction here
const generateNewCable = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize } = params;

	try {
		const newCable = Cable({ fromTime, toTime, maxPoolSize });

		await newCable.save((err, doc) => {
			if (err) console.error(err);
			else {
				console.log('generateNewCable: doc saved succesfully', doc);
			}
		});
		return newCable;
	} catch (e) {
		// Log Errors
		console.error(e);
	}
};

const updateCable = async (params, ...rest) => {
	const { cableId, fromTime, toTime, maxPoolSize } = params;

	try {
		const cable = await Cable.findOne({ _id: cableId }, 'maxPoolSize fromTime toTime');
		cable.maxPoolSize = maxPoolSize || cable.maxPoolSize;
		cable.fromTime = fromTime || cable.fromTime;
		cable.toTime = toTime || cable.toTime;

		await cable.save();
		return cable;
	} catch (e) {
		console.error(e);
	}
};

const incrementPoolSize = async (params, ...rest) => {
	const { cable } = params;
	try {
		if (cable.currPoolSize >= cable.maxPoolSize) {
			console.error('Max Pool Size reached');
		} else {
			const cableObj = await Cable.findOne({ _id: cable._id });
			cableObj.currPoolSize += 1;
			const doc = await cableObj.save();
			// const doc = await Cable.findByIdAndUpdate(
			// 	cable._id,
			// 	{
			// 		$inc: {
			// 			currPoolSize: 1,
			// 		},
			// 	},
			// 	{
			// 		new: true,
			// 	}
			// );
			return doc;
		}
	} catch (e) {
		console.error(e);
	}
};

const CableService = {
	generateNewCable,
	updateCable,
	incrementPoolSize,
};

module.exports = CableService;
