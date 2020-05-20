var Cable = require('../db/models/cable.model');

// TODO: create transaction here
const generateNewCable = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize } = params;

	try {
		const newCable = await Cable({ fromTime, toTime, maxPoolSize });
		newCable.save();
		return newCable;
	} catch (e) {
		// Log Errors
		console.error(e);
	}
};

const updateCable = async (params, ...rest) => {
	const { cableId, fromTime, toTime, maxPoolSize } = params;

	try {
		const cable = await Cable.findById(cableId, 'maxPoolSize fromTime toTime');
		cable.maxPoolSize = maxPoolSize || cable.maxPoolSize;
		cable.fromTime = fromTime || cable.fromTime;
		cable.toTime = toTime || cable.toTime;

		cable.save();
		return cable;
	} catch (e) {
		console.error(e);
	}
};

const incrementPoolSize = async (params, ...rest) => {
	const { cable } = params;
	try {
		if (cable.currPoolSize === cable.maxPoolSize) {
			console.error('Max Pool Size reached');
		} else {
			cable.currPoolSize += 1;
			cable.save();
			return cable;
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
