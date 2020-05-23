var Pool = require('../db/models/pool.model');

// TODO: create transaction here
const createNewPool = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize } = params;

	try {
		const newPool = Pool({ fromTime, toTime, maxPoolSize });
		await newPool.save();

		return newPool;
	} catch (e) {
		console.error(e);
	}
};

const updatePool = async (params, ...rest) => {
	const { PoolId, fromTime, toTime, maxPoolSize } = params;

	try {
		const Pool = await Pool.findOne({ _id: PoolId }, 'maxPoolSize fromTime toTime');

		Pool.maxPoolSize = maxPoolSize || Pool.maxPoolSize;
		Pool.fromTime = fromTime || Pool.fromTime;
		Pool.toTime = toTime || Pool.toTime;

		await Pool.save();

		return Pool;
	} catch (e) {
		console.error(e);
	}
};

const incrementPoolSize = async (params, ...rest) => {
	const { thisPool } = params;
	try {
		if (thisPool.currPoolSize >= thisPool.maxPoolSize) {
			console.error('Max Pool Size reached');
		} else {
			const poolObj = await Pool.findOne({ _id: thisPool._id });
			poolObj.currPoolSize += 1;
			const incrementedPool = await poolObj.save();

			return incrementedPool;
		}
	} catch (e) {
		console.error(e);
	}
};

const PoolService = {
	createNewPool,
	updatePool,
	incrementPoolSize,
};

module.exports = PoolService;
