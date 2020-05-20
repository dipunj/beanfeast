import Cable from '../db/models/cable.model';

// TODO: create transaction here
const generateNewCable = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize } = params;

	try {
		const newCable = await Cable({ fromTime, toTime, maxPoolSize });
		newCable.save();
		return newCable;
	} catch (e) {
		// Log Errors
		throw Error(e);
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
		throw Error(e);
	}
};

const incrementPoolSize = async (params, ...rest) => {
	const { cableId } = params;
	try {
		const cable = await Cable.findById(cableId, 'currPoolSize maxPoolSize');
		if (cable.currPoolSize === cable.maxPoolSize) {
			throw 'Max Pool Size reached';
		} else {
			cable.currPoolSize += 1;
			cable.save();
			return cable;
		}
	} catch (e) {
		throw Error(e);
	}
};

const CableService = {
	generateNewCable,
	updateCable,
	incrementPoolSize,
};

export default CableService;
