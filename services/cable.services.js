import Cable from '../db/models/cable.model';

// TODO: create transaction here
const generateNewCable = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize } = params;

	try {
		const newCable = await new Cable({ fromTime, toTime, maxPoolSize });
		newCable.save();
		return newCable;
	} catch (e) {
		// Log Errors
		throw Error(e);
	}
};

const updateCable = async (params, ...rest) => {
	const { cableId, fromTime, toTime, maxPoolSize, currPoolSize } = params;

	try {
		const cable = await Cable.findById(cableId, 'maxPoolSize');
		if (cable.maxPoolSize > currPoolSize) {
			throw 'Max Pool Size reached. Cannot add more people to this pool';
		} else {
			cable.currPoolSize = currPoolSize || cable.currPoolSize;
			cable.maxPoolSize = maxPoolSize || cable.maxPoolSize;
			cable.fromTime = fromTime || cable.fromTime;
			cable.toTime = toTime || cable.toTime;

			cable.save();
			return cable;
		}
	} catch (e) {
		throw Error(e);
	}
};
export { generateNewCable, updateCable };
